const { send } = require('micro');

let prefix = "/fmRoundsDetails";
let routes = [];

function add(path, handler) {
    routes.push({ path: prefix + path, handler });
}

(() => {

    add("/details/:roundid", async (req, res, ctx) => {
        const fmRoundsDetails = new ctx.api.FMRoundsDetails(ctx.dbconn);
        fmRoundsDetails.setRoundID(req.url.split('/').pop())

        await fmRoundsDetails.setRound();
        let tempList = fmRoundsDetails.getRound();
        if (tempList.error) return send(res, 500, tempList);
        else if (tempList.length === 0) 
            return send(res, 200, { 
                code: 'QUERY_NO_RESULT_HALT', 
                message: 'The query found no results for the parameter(s).' 
            });
        
        await fmRoundsDetails.setPlayers();
        tempList = fmRoundsDetails.getPlayers();
        if (tempList.error) return send(res, 500, tempList)
        // PlayersMeta, Props, and weapons will be nothing if no players
        if (tempList.length) {
            // PlayersMeta
            await fmRoundsDetails.setPlayersMeta();
            tempList = fmRoundsDetails.getPlayersMeta();
            if (tempList.error) return send(res, 500, tempList)

            // Props
            await fmRoundsDetails.setProps();
            tempList = fmRoundsDetails.getProps();
            if (tempList.error) return send(res, 500, tempList)

            if (fmRoundsDetails.getProps().length) {
                await fmRoundsDetails.setPropsMeta();
                tempList = fmRoundsDetails.getPropsMeta();
                if (tempList.error) return send(res, 500, tempList)
            }
            // Weapons
            await fmRoundsDetails.setWeapons();
            tempList = fmRoundsDetails.getWeapons();
            if (tempList.error) return send(res, 500, tempList)

            if (tempList.length) {
                await fmRoundsDetails.setWeaponsMeta();
                tempList = fmRoundsDetails.getWeaponsMeta();
                if (tempList.error) return send(res, 500, tempList)
            }
        }

        send(res, 200, fmRoundsDetails.getMergedData());
    });

})()

module.exports = routes;
