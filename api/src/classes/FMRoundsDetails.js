const messages = require('./messages');

module.exports = class FMRoundsDetails {

    constructor(dbconn) {
        this.db = dbconn;
        this.roundid = 0;
        this.round = [];
        this.players = [];
        this.playersMeta = [];
        this.props = [];
        this.propsMeta = [];
        this.weapons = [];
        this.weaponsMeta = [];
    }

    async setPlayers() {
        let query = `SELECT ply,damage,destroyed,alivetime,moneyspent,moneyearned,
        health,teamid,teamname,curlvl,curviprank 
        FROM rounds_players WHERE round = ?`;
        let result;
        try {
            result = await this.db.query(query, [this.roundid]);
        } catch (err) {
            result = messages.createError('setPlayers', err.code);
        }
        this.players = result;
    }

    async setPlayersMeta() {
        let query = `SELECT id,steamid,nick,playtime,nationality 
        FROM playerdata WHERE id IN (?)`;
        let result;
        try {
            result = await this.db.query(query, [this.getPlayersIDs()]);
        } catch (err) {
            result = messages.createError('setPlayersMeta', err.code);
        }
        this.playersMeta = result;
    }

    async setProps() {
        let query = `SELECT ply,prop,amount 
        FROM rounds_props WHERE round = ?`;
        let result;
        try {
            result = await this.db.query(query, [this.roundid]);
        } catch (err) {
            result = messages.createError('setProps', err.code);
        }
        this.props = result;
    }

    async setPropsMeta() {
        let query = `SELECT id,name FROM config_props WHERE id IN (?)`;
        let result;
        try {
            result = await this.db.query(query, [this.getPropsIDs()]);
        } catch (err) {
            result = messages.createError('setRound', err.code);
        }
        this.propsMeta = result;
    }

    async setRound() {
        let query = `SELECT id,date,event,server,duration,endtype 
        FROM rounds WHERE id = ?`;
        let result;
        try {
            result = await this.db.query(query, [this.roundid]);
        } catch (err) {
            result = messages.createError('setRound', err.code);
        }
        this.round = result;
    }

    setRoundID(roundid) {
        this.roundid = roundid;
    }

    async setWeapons() {
        let query = `SELECT ply,weapon,shots,hits 
        FROM rounds_weapons WHERE round = ?`;
        let result;
        try {
            result = await this.db.query(query, [this.roundid]);
        } catch (err) {
            result = messages.createError('setWeapons', err.code);
        }
        this.weapons = result;
    }

    async setWeaponsMeta() {
        let query = `SELECT id,name 
        FROM config_weapons_new WHERE id IN (?)`;
        let result;
        try {
            result = await this.db.query(query, [this.getWeaponsIDs()]);
        } catch (err) {
            result = messages.createError('setWeapons', err.code);
        }
        this.weaponsMeta = result;
    }

    getMergedData() {
        return {
            round: this.round[0],
            players: this.players,
            playersMeta: this.playersMeta,
            props: this.props,
            propsMeta: this.propsMeta,
            weapons: this.weapons,
            weaponsMeta: this.weaponsMeta
        };
    }

    getPlayers() {
        return this.players;
    }

    getPlayersIDs() {
        return this.players.map(obj => obj.ply)
    }

    getPlayersMeta() {
        return this.playersMeta;
    }

    getProps() {
        return this.props;
    }

    getPropsIDs() {
        return this.props.map(obj => obj.prop);
    }

    getPropsMeta() {
        return this.propsMeta;
    }

    getRound() {
        return this.round;
    }

    getWeapons() {
        return this.weapons;
    }

    getWeaponsIDs() {
        return this.weapons.map(obj => obj.weapon);
    }

    getWeaponsMeta() {
        return this.weaponsMeta;
    }

}