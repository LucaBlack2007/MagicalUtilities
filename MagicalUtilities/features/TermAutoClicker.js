import Settings from "../Settings";
import { rightClick, chat } from "../utils/Utils";


const rcBind = new KeyBind(Client.getMinecraft().field_71474_y.field_74313_G)

let lastClick = null
let cps = Settings.terminatorCPS;

function itemInHand() {
	let item = Player.getHeldItem();
	let itemList = Settings.item.split(",");
	let r = false;
	for (let i = 0; i < itemList.length; i++) {
		if (item.getName().includes(itemList[i])) r = true;
	}
	return r;
}

const exclude_ac = [
	"minecraft:lever",
	"minecraft:stone_button",
	"minecraft:command_block"
]

register("tick", () => {
	if (Settings.terminatorToggled === true) {
		cps = Settings.terminatorCPS;
		const la = Player.lookingAt();
		if (la.getClass() === Block && exclude_ac.includes(la.type.getRegistryName())) return;
		if (Player.getHeldItem() === null) return;
		if (new Date().getTime() - lastClick < 1000 / cps || !rcBind.isKeyDown() || !itemInHand()) return;
		for (let i = 0; i < cps / 20; i++) rightClick();
	}
})

register("command", (cps) => {
	if (cps === undefined) {
		chat("&dAn argument is required. &5/termcps <amount>");
		return;
	}
	if (cps < 5 || cps > 500) {
		chat("&dProvided argument must be 5-500. &5/termcps <amount>");
        chat("&7&onote that anything 350+ has a tendancy to limbo you.");
		return;
	}

	Settings.terminatorCPS = cps;
	chat("&dTerminator right-click CPS set to &5" + cps + "&d.");

}).setName("termcps");