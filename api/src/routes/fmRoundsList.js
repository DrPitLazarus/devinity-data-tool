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
        if (tempList.error) return send(res, 500, tempList);
        // If there are rounds
        if (tempList.length) {
            await fmRoundsList.setPlayerCounts();
            tempList = fmRoundsList.getPlayerCounts();
            if (tempList.error) return send(res, 500, tempList);
        }

        send(res, 200, fmRoundsList.getMergedList());
    });

    add("/listByServer/:server", async (req, res, ctx) => {
        const fmRoundsList = new ctx.api.FMRoundsList(ctx.dbconn);

        await fmRoundsList.setListByServer(req.url.split('/').pop());
        let tempList = fmRoundsList.getList();
        if (tempList.error) return send(res, 500, tempList);
        // If there are rounds with the server
        if (tempList.length) {
            await fmRoundsList.setPlayerCounts();
            tempList = fmRoundsList.getPlayerCounts();
            if (tempList.error) return send(res, 500, tempList);
        }

        send(res, 200, fmRoundsList.getMergedList());
    });

    add("/listByPlayer/:steamid", async (req, res, ctx) => {
        const devinity = new ctx.api.Devinity(ctx.dbconn);
        const fmRoundsList = new ctx.api.FMRoundsList(ctx.dbconn);

        let player = await devinity.getPlayerBySteamID(req.url.split('/').pop());
        if (player.error) return send(res, 500, player);
        // If player is in devinity
        if (player.length) {
            // Get rounds with the player ID
            let rounds = await fmRoundsList.getRoundsWithPlayerID(player[0].id);
            if (rounds.error) return send(res, 500, rounds);
            // If there is rounds with the player
            if (rounds.length) {
                await fmRoundsList.setListByRounds(rounds);
                let tempList = fmRoundsList.getList();
                if (tempList.error) return send(res, 500, tempList);

                // Set player counts
                await fmRoundsList.setPlayerCounts();
                tempList = fmRoundsList.getPlayerCounts();
                if (tempList.error) return send(res, 500, tempList);
            }
        }
        
        send(res, 200, fmRoundsList.getMergedList());
    });

})()

module.exports = routes;
