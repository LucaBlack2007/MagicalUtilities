import { fmtMSS, prettyPrint, getRank, cataLevel, data, getHypixelPlayer, getMojangInfo, getSbProfiles, getRecentProfile, chat, ca } from "../utils/Utils";

register("messageSent", (message, event) => { 
    if (message.toLowerCase().includes("nice namehistory") || message.toLowerCase().includes("nice nh")) {
        let player = message.toLowerCase().replaceAll("nice namehistory ", "").replaceAll("nice nh ", "");
        getMojangInfo(player).then(mojangInfo => {
            mojangInfo = JSON.parse(mojangInfo)
            player = mojangInfo.name
            let uuid = mojangInfo.id
            getHypixelPlayer(uuid, data.apiKey).then(playerInfo => {
                playerInfo = JSON.parse(playerInfo)
                chat(getRank(playerInfo) + " " + player + " &7name history&e:")
                let a = [];
                for (let i = 0; i < playerInfo["player"]["knownAliases"].length; i++) {
                    a.push("&e" + playerInfo["player"]["knownAliases"][i])
                }
                chat(a.join("&7, ") + `&7, &e${player}`)
            }).catch(e => chat(e));
        }).catch(e => chat(e));
        cancel(event);
    }
});

register("command", (player) => {
    getMojangInfo(player).then(mojangInfo => {
        mojangInfo = JSON.parse(mojangInfo)
        player = mojangInfo.name
        let uuid = mojangInfo.id
        getHypixelPlayer(uuid, data.apiKey).then(playerInfo => {
            playerInfo = JSON.parse(playerInfo)
            chat(getRank(playerInfo) + " " + player + " &7name history&e:")
            let a = [];
            for (let i = 0; i < playerInfo["player"]["knownAliases"].length; i++) {
                a.push("&e" + playerInfo["player"]["knownAliases"][i])
            }
            chat(a.join("&7, ") + `&7, &e${player}`)
        }).catch(e => chat(e));
    }).catch(e => chat(e));
}).setName("namehistory");
