const fmRoundsList = require('./fmRoundsList');

let prefix = "/api";
let routes = [];

function pushRoutes(routesArr) {
    routesArr = routesArr.map(route => {
        return {
            ...route,
            path: prefix + route.path
        }
    });
    routes.push(...routesArr);
}

(() => {
    pushRoutes(fmRoundsList);
})()

module.exports = routes;
