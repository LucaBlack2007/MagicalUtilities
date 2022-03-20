import { fmtMSS, prettyPrint, getRank, cataLevel, data, getHypixelPlayer, getMojangInfo, getSbProfiles, getRecentProfile, chat, ca } from "../utils/Utils";

register("command", (player) => {
    if (!data.apiKey) return chat(`&cError: API Key not set! Set it with &e/magical api <key>`);
    if (!player) player = Player.getName();
    getMojangInfo(player).then(mojangInfo => {
        mojangInfo = JSON.parse(mojangInfo)
        player = mojangInfo.name
        let uuid = mojangInfo.id
        getHypixelPlayer(uuid, data.apiKey).then(playerInfo => {
            playerInfo = JSON.parse(playerInfo)
            let playerName = playerInfo.player.displayname
            getSbProfiles(uuid, data.apiKey).then(profiles => {
                let sbProfile = getRecentProfile(JSON.parse(profiles), uuid)
                if (sbProfile == null) {
                    ChatLib.clearChat(currentChat)
                    return chat(`&cPlayer has no Skyblock profiles!`)
                }
                if (Object.keys(sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]).length == 0) {
                    ChatLib.clearChat(currentChat)
                    return chat(`&c${playerName} has never entered the Catacombs!`)
                }

                let secretsFound = playerInfo.player.achievements.skyblock_treasure_hunter;
                secretsFound = secretsFound == undefined ? 0 : secretsFound;
                
                let bloodMobs = (sbProfile["members"][uuid]["stats"]["kills_watcher_summon_undead"] ?? 0) + (sbProfile["members"][uuid]["stats"]["kills_watcher_summon_skeleton"] ?? 0) + (sbProfile["members"][uuid]["stats"]["kills_master_watcher_summon_undead"] ?? 0);
                bloodMobs = bloodMobs == undefined ? 0 : bloodMobs;

                let mmBloodMobs = sbProfile["members"][uuid]["stats"]["kills_master_watcher_summon_undead"] ?? 0;
                mmBlodoMobs = mmBloodMobs == undefined ? 0 : mmBloodMobs;

                let nonMmBloodMobs = (sbProfile["members"][uuid]["stats"]["kills_watcher_summon_undead"] ?? 0) + (sbProfile["members"][uuid]["stats"]["kills_watcher_summon_skeleton"] ?? 0);
                nonMmBloodMobs = nonMmBloodMobs == undefined ? 0 : nonMmBloodMobs;

                let cata = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"];
                let cataXp = parseInt(cata["experience"]);
                let level = cataLevel(cataXp); 

                let floorSeven = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["fastest_time_s_plus"]["7"] ?? 0;
                let floorSix = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["fastest_time_s_plus"]["6"] ?? 0;
                let floorFive = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["fastest_time_s_plus"]["5"] ?? 0;
                let floorFour = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["fastest_time_s_plus"]["4"] ?? 0;
                let floorThree = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["fastest_time_s_plus"]["3"] ?? 0;
                let floorTwo = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["fastest_time_s_plus"]["2"] ?? 0;
                let floorOne = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["fastest_time_s_plus"]["1"] ?? 0;

                let masterSeven = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["fastest_time_s_plus"]["7"] ?? 0;
                let masterSix = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["fastest_time_s_plus"]["6"] ?? 0;
                let masterFive = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["fastest_time_s_plus"]["5"] ?? 0;
                let masterFour = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["fastest_time_s_plus"]["4"] ?? 0;
                let masterThree = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["fastest_time_s_plus"]["3"] ?? 0;
                let masterTwo = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["fastest_time_s_plus"]["2"] ?? 0;
                let masterOne = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["fastest_time_s_plus"]["1"] ?? 0;

                let floorSevenS = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["fastest_time_s"]["7"] ?? 0;
                let floorSixS = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["fastest_time_s"]["6"] ?? 0;
                let floorFiveS = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["fastest_time_s"]["5"] ?? 0;
                let floorFourS = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["fastest_time_s"]["4"] ?? 0;
                let floorThreeS = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["fastest_time_s"]["3"] ?? 0;
                let floorTwoS = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["fastest_time_s"]["2"] ?? 0;
                let floorOneS = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["fastest_time_s"]["1"] ?? 0;

                let masterSevenS = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["fastest_time_s"]["7"] ?? 0;
                let masterSixS = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["fastest_time_s"]["6"] ?? 0;
                let masterFiveS = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["fastest_time_s"]["5"] ?? 0;
                let masterFourS = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["fastest_time_s"]["4"] ?? 0;
                let masterThreeS = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["fastest_time_s"]["3"] ?? 0;
                let masterTwoS = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["fastest_time_s"]["2"] ?? 0;
                let masterOneS = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["fastest_time_s"]["1"] ?? 0;

                let floorSevenCompletions = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["tier_completions"]["7"] ?? 0;
                let floorSixCompletions = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["tier_completions"]["6"] ?? 0;
                let floorFiveCompletions = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["tier_completions"]["5"] ?? 0;
                let floorFourCompletions = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["tier_completions"]["4"] ?? 0;
                let floorThreeCompletions = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["tier_completions"]["3"] ?? 0;
                let floorTwoCompletions = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["tier_completions"]["2"] ?? 0;
                let floorOneCompletions = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["catacombs"]["tier_completions"]["1"] ?? 0;

                let masterSevenCompletions = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["tier_completions"]["7"] ?? 0;
                let masterSixCompletions = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["tier_completions"]["6"] ?? 0;
                let masterFiveCompletions = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["tier_completions"]["5"] ?? 0;
                let masterFourCompletions = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["tier_completions"]["4"] ?? 0;
                let masterThreeCompletions = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["tier_completions"]["3"] ?? 0;
                let masterTwoCompletions = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["tier_completions"]["2"] ?? 0;
                let masterOneCompletions = sbProfile["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["tier_completions"]["1"] ?? 0;

                let totalRuns = 
                      floorSevenCompletions
                    + floorSixCompletions
                    + floorFiveCompletions
                    + floorFourCompletions
                    + floorThreeCompletions
                    + floorTwoCompletions
                    + floorOneCompletions
                    + masterSevenCompletions
                    + masterSixCompletions
                    + masterFiveCompletions
                    + masterFourCompletions
                    + masterThreeCompletions
                    + masterTwoCompletions
                    + masterOneCompletions;
                    
                let secretAverage = secretsFound / totalRuns;

                // fmtMSS for times XX:XX.XX
                // nonMmBloodMobs | mmBloodMobs

                new Message(
                    new TextComponent(`${getRank(playerInfo)} ${playerName} &eDungeon Data\n\n`).setClick("open_url", `https://sky.shiiyu.moe/stats/${player}`),
                    new TextComponent("&eCatacombs Level&7: &b" + level.toFixed(2) + "\n\n").setHover("show_text", `&7[&e${prettyPrint(Math.floor(cataXp - ca[Math.floor(parseFloat(level.toString()))][1]))}&b/&e${prettyPrint(ca[Math.floor(parseFloat(level.toString())) + 1][1] - ca[Math.floor(parseFloat(level.toString()))][1])}]&7`),
                    new TextComponent("&eSecrets&7: &b" + prettyPrint(secretsFound) + "\n").setHover("show_text", `&eSecret/Run&7: &b${prettyPrint(secretAverage.toFixed(2))}`),
                    new TextComponent("&eBlood Mobs&7: &b" + prettyPrint(bloodMobs) + "\n").setHover("show_text", `&eCatacombs Blood Kills&7: &b${prettyPrint(nonMmBloodMobs)}\n&eMaster Blood Kills&7: &b${prettyPrint(mmBloodMobs)}`),
                    new TextComponent("&eTotal Runs&7: &b" + prettyPrint(totalRuns) + "\n\n").setHover("show_text", `&e7&7: &b${masterSevenCompletions+floorSevenCompletions}\n&e6&7: &b${masterSixCompletions+floorSixCompletions}\n&e5&7: &b${masterFiveCompletions+floorFiveCompletions}\n&e4&7: ${masterFourCompletions+floorFourCompletions}\n&e3&7: &b${masterThreeCompletions+floorThreeCompletions}\n&e2&7: &b${masterTwoCompletions+floorTwoCompletions}\n&e1&7: &b${masterOneCompletions+floorOneCompletions}`),
                    new TextComponent("&eMaster Mode &bS+\n").setHover("show_text", "7: " + fmtMSS(masterSeven) + "\n" + "6: " + fmtMSS(masterSix) + "\n" + "5: " + fmtMSS(masterFive) + "\n" + "4: " + fmtMSS(masterFour) + "\n" + "3: " + fmtMSS(masterThree) + "\n" + "2: " + fmtMSS(masterTwo) + "\n" + "1: " + fmtMSS(masterOne)),
                    new TextComponent("&eMaster Mode &bS\n\n").setHover("show_text", "7: " + fmtMSS(masterSevenS) + "\n" + "6: " + fmtMSS(masterSixS) + "\n" + "5: " + fmtMSS(masterFiveS) + "\n" + "4: " + fmtMSS(masterFourS) + "\n" + "3: " + fmtMSS(masterThreeS) + "\n" + "2: " + fmtMSS(masterTwoS) + "\n" + "1: " + fmtMSS(masterOneS)),
                    new TextComponent("&eCatacombs &bS+\n").setHover("show_text", "7: " + fmtMSS(floorSeven) + "\n" + "6: " + fmtMSS(floorSix) + "\n" + "5: " + fmtMSS(floorFive) + "\n" + "4: " + fmtMSS(floorFour) + "\n" + "3: " + fmtMSS(floorThree) + "\n" + "2: " + fmtMSS(floorTwo) + "\n" + "1: " + fmtMSS(floorOne)),
                    new TextComponent("&eCatacombs &bS").setHover("show_text", "7: " + fmtMSS(floorSevenS) + "\n" + "6: " + fmtMSS(floorSixS) + "\n" + "5: " + fmtMSS(floorFiveS) + "\n" + "4: " + fmtMSS(floorFourS) + "\n" + "3: " + fmtMSS(floorThreeS) + "\n" + "2: " + fmtMSS(floorTwoS) + "\n" + "1: " + fmtMSS(floorOneS))
                ).chat();         

            }).catch(error => {
                chat(`&cError: ${error}`);
                return;
            });
        }).catch(error => {
            chat(`&cError: ${error}`);
            return;
        });
    }).catch(error => {
        chat(`&cError: ${error}`);
        return;
    });
}).setName("cata")
