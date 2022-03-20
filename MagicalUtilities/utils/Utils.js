import PogObject from "../../PogData/index";
import Settings from "../Settings";
import request from "../../requestV2";

function chat(msg) { ChatLib.chat(msg); }
function prefix() { return ChatLib.getCenteredText("&5&l&nM&d&l&na&5&l&ng&d&l&ni&5&l&nc&d&l&na&5&l&nl &d&l&nU&5&l&nt&d&l&ni&5&l&nl&d&l&ni&5&l&nt&d&l&ni&5&l&ne&d&l&ns"); }
function blankLine() { ChatLib.chat(" "); }
function equalsIgnoreCase(v1, v2) { if (v1.toUpperCase() === v2.toUpperCase()) return false; else return true; }
function contains(obj, list) {
	for (var i = 0; i < list.length; i++) {
		if (list[i] === obj) {
			return true;
		}
	}
	return false;
}
function getEnchant(item) {
	try {
		return item.getLore()[1];
	} catch (e) {
		return undefined;
	}
}
function removeFromList(list, index) {
	let l = [];
	list.forEach(i => {
	  if (i !== index) {
		l.push(i);
	  }
	});
	return l;
}
function stripRank(rankedPlayer) {
	return rankedPlayer.replace(/\[[\w+\+-]+] /, "")
}
function rightClick() {
	const rightClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag", null)
	rightClickMethod.setAccessible(true);
	rightClickMethod.invoke(Client.getMinecraft(), null);
}

function stripItemName(item) {
	let removeList = [
		"Gentle", "Odd", "Fast", "Epic", "Sharp", "Heroic", "Spicy", "Legendary", "Dirty",
		"Fabled", "Suspicious", "Gilded", "Warped", "Withered", "Bulky", "Hasty", "Spiritual"
	];

	let name = item.getName() ?? "";

	removeList.forEach(index => {
		if (name.includes(index)) {
			name = name.replaceAll(index, "");
			
		}
	})
	
	if (name.includes("✪")) name = name.replaceAll("✪", "");
	
	return name;
	
}

function partyChat(msg) { ChatLib.command("party chat " + msg) }

const Blocky = Java.type("net.minecraft.block.Block");
const BlockPoss = Java.type("net.minecraft.util.BlockPos")
const C09PacketHeldItemChange = Java.type("net.minecraft.network.play.client.C09PacketHeldItemChange");

export const S12PacketEntityVelocity = Java.type("net.minecraft.network.play.server.S12PacketEntityVelocity");
export const S27PacketExplosion = Java.type("net.minecraft.network.play.server.S27PacketExplosion");

export const data = new PogObject("MagicalUtilities", {
    "apiKey": null,
	"sceptreBlacklist": ["Hyperion", "Scylla", "Valkyrie", "Astraea"],
    "chestContents": [
		"GIANT'S SWORD",
		"NECRON'S HANDLE",
		"WITHER CHESTPLATE",
		"ONE FOR ALL",
		"RECOMBOBULATOR",
		"FIRST MASTER STAR",
		"SECOND MASTER STAR",
		"THIRD MASTER STAR",
		"FOURTH MASTER STAR",
		"FIFTH MASTER STAR",
		"SHADOW ASSASSIN CHESTPLATE",
		"SHADOW FURY",
		"SPIRIT WING",
		"DARK CLAYMORE"
	]
}, "./data.json");

export const colors = {
	"BLACK": "&0",
	"DARK_BLUE": "&1",
	"DARK_GREEN": "&2",
	"DARK_AQUA": "&3",
	"DARK_RED": "&4",
	"DARK_PURPLE": "&5",
	"GOLD": "&6",
	"GRAY": "&7",
	"DARK_GRAY": "&8",
	"BLUE": "&9",
	"GREEN": "&a",
	"AQUA": "&b",
	"RED": "&c",
	"LIGHT_PURPLE": "&d",
	"YELLOW": "&e",
	"WHITE": "&f"
}

export const getRank = (playerInfo) => {
	// Gets the player's rank via the Hypixel player API method json
	let rankFormats = {
		"VIP": "&a[VIP]",
		"VIP_PLUS": "&a[VIP&6+&a]",
		"MVP": "&b[MVP]",
		"MVP_PLUS": "&b[MVP&c+&b]",
		"ADMIN": "&c[ADMIN]",
		"MODERATOR": "&2[MOD]",
		"HELPER": "&9[HELPER]",
		"YOUTUBER": "&c[&fYOUTUBE&c]"
	}
	let specialRanks = {
		"Technoblade": "&d[PIG&b+++&d]"
	}
	let username = playerInfo["player"]["displayname"]
	if (username in specialRanks) {
		return specialRanks[username];
	}
	if ("rank" in playerInfo["player"] && playerInfo["player"]["rank"] in rankFormats) { return rankFormats[playerInfo["player"]["rank"]] }
	let currRank = "&7";
	if ("newPackageRank" in playerInfo["player"]) {
		currRank = rankFormats[playerInfo["player"]["newPackageRank"]];
	}
	if ("monthlyPackageRank" in playerInfo["player"] && playerInfo["player"]["monthlyPackageRank"] == "SUPERSTAR") {
		currRank = "&6[MVP&c++&6]"
		if ("monthlyRankColor" in playerInfo["player"]) {
			currRank = currRank.replace("&b", colors[playerInfo["player"]["monthlyRankColor"]]);
		}
	}
	if ("rankPlusColor" in playerInfo["player"]) {
		currRank = currRank.replace(/\+/g, `${colors[playerInfo['player']['rankPlusColor']]}+`);
	}
	return currRank;
}

export const ca = [
    [0, 0],
    [1, 50],
    [2, 125],
    [3, 235],
    [4, 395],
    [5, 625],
    [6, 955],
    [7, 1425],
    [8, 2095],
    [9, 3045],
    [10, 4385],
    [11, 6275],
    [12, 8940],
    [13, 12700],
    [14, 17960],
    [15, 25340],
    [16, 35640],
    [17, 50040],
    [18, 70040],
    [19, 97640],
    [20, 135640],
    [21, 188140],
    [22, 259640],
    [23, 356640],
    [24, 488640],
    [25, 668640],
    [26, 911640],
    [27, 1239640],
    [28, 1684640],
    [29, 2284640],
    [30, 3084640],
    [31, 4149640],
    [32, 5559640],
    [33, 7459640],
    [34, 9959640],
    [35, 13259640],
    [36, 17559640],
    [37, 23159640],
    [38, 30359640],
    [39, 39559640],
    [40, 51559640],
    [41, 66559640],
    [42, 85559640],
    [43, 109559640],
    [44, 139559640],
    [45, 177559640],
    [46, 225559640],
    [47, 285559640],
    [48, 360559640],
    [49, 453559640],
    [50, 569809640],
	[51, 769809640],
	[52, 969809640],
	[53, 1169809640],
	[54, 1369809640],
	[55, 1569809640],
	[56, 1769809640],
	[57, 1969809640],
	[58, 2169809640],
	[59, 2369809640],
	[60, 2569809640],
	[61, 2769809640],
	[62, 2969809640],
	[63, 3169809640],
	[64, 3369809640],
	[65, 3569809640],
	[66, 3769809640],
	[67, 3969809640],
	[68, 4169809640],
	[69, 4369809640],
	[70, 4569809640],
	[71, 4769809640],
	[72, 4969809640],
	[73, 5169809640],
	[74, 5369809640],
	[75, 5569809640],
	[76, 5769809640],
	[77, 5969809640],
	[78, 6169809640],
	[79, 6369809640],
	[80, 6569809640],
	[81, 6769809640],
	[82, 6969809640],
	[83, 7169809640],
	[84, 7369809640],
	[85, 7569809640],
	[86, 7769809640],
	[87, 7969809640],
	[88, 8169809640],
	[89, 8369809640],
	[90, 8569809640],
	[91, 8769809640],
	[92, 8969809640],
	[93, 9169809640],
	[94, 9369809640],
	[95, 9569809640],
	[96, 9769809640],
	[97, 9969809640],
	[98, 10169809640],
	[99, 10369809640]
];

export function fmtMSS(number) {
    let ms = (number % 1000).toString();
    if (ms.length === 2) {
        ms = "0" + ms;
    }
    let minutes = Math.floor(number / 60000);
    let seconds = Math.floor(((number % 60000) / 1000))
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds + "." + (ms);
}

export function cataLevel(xp) {
    let level = 0
    let percentage = 0.0
    for (let i = 0; i < ca.length; i++) {
        if (ca[i][1] > xp) {
            level = ca[i][0]
            let a = xp - ca[i - 1][1]
            let b = ca[i][1] - ca[i - 1][1]
            percentage = a / b
            break;
        }

    }
    if (level === 0) {
        return 0
    }
    return level + percentage - 1;
}

export const cycleSnowBall = (a) => `/give milesrishot minecraft:snowball ${a}`;

export const prettyPrint = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const getRecentProfile = (profiles, uuid) => profiles.profiles.map(a => [a.members[uuid].last_save, a]).sort((a, b) => a[0] - b[0]).reverse()[0][1]
export const getMojangInfo = (player) => player.length > 16 ? request(`https://sessionserver.mojang.com/session/minecraft/profile/${player}`) : request(`https://api.mojang.com/users/profiles/minecraft/${player}`)
export const getHypixelPlayer = (uuid) => request(`https://api.hypixel.net/player?key=${data.apiKey}&uuid=${uuid}`)
export const getSbProfiles = (uuid) => request(`https://api.hypixel.net/skyblock/profiles?key=${data.apiKey}&uuid=${uuid}`)
export const getSlothPixelPlayer = (player) => request(`https://api.slothpixel.me/api/players/${player}`)
export const getGuildInfo = (player) => request(`https://api.slothpixel.me/api/guilds/${player}`)


export { Blocky, BlockPoss, C09PacketHeldItemChange, partyChat, stripItemName, stripRank, removeFromList, getEnchant, contains, equalsIgnoreCase, blankLine, prefix, chat, rightClick }