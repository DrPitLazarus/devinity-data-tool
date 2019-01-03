const messages = require('./messages');

module.exports = class FMRoundsList {

    constructor(dbconn) {
        this.db = dbconn;
        this.list = [];
        this.players = [];
    }

    async setList() {
        let query = `SELECT id,date,event,server,duration,endtype
        FROM rounds
        WHERE finished = 1
        ORDER BY id DESC LIMIT 200`;
        let result;
        try {
            result = await this.db.query(query);
            if (result == false) {
                result = messages.NO_ITEMS_RETURNED;
            }
        } catch (err) {
            result = messages.createError('setList', err.code);
        }
        this.list = result;
    }

    async setListByRounds(rounds) {
        let query = `SELECT id,date,event,server,duration,endtype
        FROM rounds
        WHERE finished = 1 AND id IN (?)
        ORDER BY id DESC`;
        let result;
        try {
            result = await this.db.query(query, [rounds]);
            if (result == false) {
                result = messages.NO_ITEMS_RETURNED;
            }
        } catch (err) {
            result = messages.createError("setListByRounds", err.code);
        }
        this.list = result;
    }

    async setListByServer(server) {
        let query = `SELECT id,date,event,server,duration,endtype
        FROM rounds
        WHERE finished = 1 AND server = ?
        ORDER BY id DESC LIMIT 200`;
        let result;
        try {
            result = await this.db.query(query, [server]);
            if (result == false) {
                result = messages.NO_ITEMS_RETURNED;
            }
        } catch (err) {
            result = messages.createError("setListByServer", err.code);
        }
        this.list = result;
    }

    async setPlayerCounts() {
        let query = `SELECT round, COUNT(ply) AS players FROM rounds_players
        WHERE round IN (?) 
        GROUP BY round
        ORDER BY round DESC`;
        let result;
        try {
            result = await this.db.query(query, [this.getRounds()]);
            if (result == false) {
                result = messages.NO_ITEMS_RETURNED;
            }
        } catch (err) {
            result = messages.createError("setPlayerCount", err.code);
        }
        this.players = result;
    }

    getList() {
        return this.list;
    }

    getMergedList() {
        return this.list.map(obj => {
            let newObj = { ...obj };
            let findInPlayers = this.players.find(plyObj => plyObj.round === obj.id);
            newObj.players = findInPlayers ? findInPlayers.players : 0;
            return newObj;
        });
    }

    getPlayerCounts() {
        return this.players;
    }

    getRounds() {
        return this.list.map(obj => obj.id);
    }

    async getRoundsWithPlayerID(playerid) {
        let query = `SELECT round FROM rounds_players 
        WHERE ply = ?
        ORDER BY round DESC 
        LIMIT 200`;
        let result;
        try {
            result = await this.db.query(query, [playerid]);
            if (result == false) {
                result = messages.NO_ITEMS_RETURNED;
            } else {
                result = result.map(row => row.round);
            }
        } catch (err) {
            result = messages.createError("getRoundsWithPlayerID", err.code);
        }
        return result;
    }
    
}

