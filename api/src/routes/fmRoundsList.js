const { send } = require('micro');

let prefix = "/fmRoundsList";
let routes = [];

function add(path, handler) {
    routes.push({ path: prefix + path, handler });
}

(() => {

    add("/list", async (req, res, ctx) => {
        const fmRoundsList = new ctx.api.FMRoundsList(ctx.dbconn);
        await fmRoundsList.setList();
        let tempList = fmRoundsList.getList();
        if (tempList.error || tempList.message) {
            return send(res, tempList.error ? 500 : 200, tempList)
        }
        await fmRoundsList.setPlayerCounts();
        tempList = fmRoundsList.getPlayerCounts();
        if (tempList.error || tempList.message) {
            return send(res, tempList.error ? 500 : 200, tempList)
        }
        send(res, 200, fmRoundsList.getMergedList());
    });

    add("/listByServer/:server", async (req, res, ctx) => {
        const fmRoundsList = new ctx.api.FMRoundsList(ctx.dbconn);
        await fmRoundsList.setListByServer(req.url.split('/').pop());
        let tempList = fmRoundsList.getList();
        if (tempList.error || tempList.message) {
            return send(res, tempList.error ? 500 : 200, tempList)
        }
        await fmRoundsList.setPlayerCounts();
        tempList = fmRoundsList.getPlayerCounts();
        if (tempList.error || tempList.message) {
            return send(res, tempList.error ? 500 : 200, tempList)
        }
        send(res, 200, fmRoundsList.getMergedList());
    });

    add("/listByPlayer/:steamid", async (req, res, ctx) => {
        const devinity = new ctx.api.Devinity(ctx.dbconn);
        const fmRoundsList = new ctx.api.FMRoundsList(ctx.dbconn);
        let player = await devinity.getPlayerBySteamID(req.url.split('/').pop());
        if (player.error || player.message) {
            return send(res, player.error ? 500 : 200, player)
        }
        let rounds = await fmRoundsList.getRoundsWithPlayerID(player.id);
        if (rounds.error || rounds.message) {
            return send(res, rounds.error ? 500 : 200, rounds)
        }
        await fmRoundsList.setListByRounds(rounds);
        let tempList = fmRoundsList.getList();
        if (tempList.error || tempList.message) {
            return send(res, tempList.error ? 500 : 200, tempList)
        }
        await fmRoundsList.setPlayerCounts();
        tempList = fmRoundsList.getPlayerCounts();
        if (tempList.error || tempList.message) {
            return send(res, tempList.error ? 500 : 200, tempList)
        }
        send(res, 200, fmRoundsList.getMergedList());
    });

})()

module.exports = routes;
