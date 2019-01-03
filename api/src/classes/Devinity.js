const messages = require('./messages');

module.exports = class Devinity {

    constructor(dbconn) {
        this.db = dbconn;
    }

    async getPlayerBySteamID(steamid) {
        let query = `SELECT * FROM playerdata WHERE steamid = ?`;
        let result;
        try {
            result = await this.db.query(query, [steamid]);
            if (result == false) {
                result = messages.NO_ITEMS_RETURNED;
            } else {
                result = result[0];
            }
        } catch (err) {
            result = messages.createError("getPlayerBySteamID", err.code);
        }
        return result;
    }

}