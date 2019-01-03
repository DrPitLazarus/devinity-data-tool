// import packages
require('now-env');
require('make-promises-safe');
const { send } = require('micro');
const urlPattern = require('url-pattern');

// import src files
const routes = require('./src/routes');
const api = require('./src/classes');
const dbconn = require('./src/dbconn')({
    connectionLimit: 10,
    host: process.env.host,
    user: process.env.user,
    password: process.env.pass,
    database: process.env.db
});



// this is run on each request
module.exports = async (req, res) => {
    // enable cors
    res.setHeader('access-control-allow-origin', '*');
    // test if db connection is working
    try {
        await dbconn.query('SELECT id FROM playerdata WHERE id = 1122');
    } catch (err) {
        return send(res, 500, { error: 'db test connect failed: ' + err.code });
    }
    console.info(req.url)
    // go through all routes and see if one matches the request url
    let matches = routes.find(route => new urlPattern(route.path, 
        { segmentValueCharset: 'a-zA-Z0-9-_~ %:'})
        .match(req.url))
    // passes the api and dbconn to the handler
    if (matches) return matches.handler(req, res, { api, dbconn });

    // if no route is matched
    send(res, 404, { error: 'Not found.' });
}
