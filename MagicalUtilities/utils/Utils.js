import PogObject from "../../PogData/index"

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

export const data = new PogObject("MagicalUtilities", {
    "apiKey": null,
    "chestContents": []
}, "./data.json");

export const getMojangInfo = (player) => player.length > 16 ? request(`https://sessionserver.mojang.com/session/minecraft/profile/${player}`) : request(`https://api.mojang.com/users/profiles/minecraft/${player}`)
export const getHypixelPlayer = (uuid) => request(`https://api.hypixel.net/player?key=${data.apiKey}&uuid=${uuid}`)
export const getSbProfiles = (uuid) => request(`https://api.hypixel.net/skyblock/profiles?key=${data.apiKey}&uuid=${uuid}`)
export const getSlothPixelPlayer = (player) => request(`https://api.slothpixel.me/api/players/${player}`)
export const getGuildInfo = (player) => request(`https://api.slothpixel.me/api/guilds/${player}`)


export { Blocky, BlockPoss, C09PacketHeldItemChange, partyChat, stripItemName, stripRank, removeFromList, getEnchant, contains, equalsIgnoreCase, blankLine, prefix, chat, rightClick }