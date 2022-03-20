import Settings from "../Settings";
import { getEnchant, chat, data, removeFromList } from "../utils/Utils";

// data.save
// chestContents from "./utils/Utils/data" 

let loot = data.chestContents;
register("tick", () => loot = data.chestContents);

register("postGuiRender", () => {
	if (Settings.instabuy) {
		new Thread(() => {
			let inv = Player.getOpenedInventory();
			if (inv?.getName()?.includes("Obsidian Chest") || inv?.getName()?.includes("Bedrock Chest")) {
				for (let i = 0; i < 53; i++) {
					try {
						for (let j = 0; j < loot.length; j++) {
							if (inv.getStackInSlot(i).getName().toUpperCase().includes(loot[j].toUpperCase()) || getEnchant(inv.getStackInSlot(i)).toUpperCase().includes(loot[j].toUpperCase())) {
								inv.click(31, false, "LEFT");
								Thread.sleep(50);
								Client.currentGui.close();
							}
						}
					} catch (e) {}
				}
			} else if (inv?.getName()?.includes("Wood Chest")) {
				inv.click(31, false, "LEFT");
				Client.currentGui.close();
			} 
		}).start()
	}
})

register("command", (...args) => {
	if (!Settings.instabuy) {
		chat("&cPlease turn on &4\"Toggle Insta-Buy\"&c in &4/magical&c!");
		return;
	}
	if (args === undefined || args[0].includes("list") || !(args[0].includes("add") || args[0].includes("remove") || args[0].includes("delete"))) {
		chat(ChatLib.getCenteredText("&4&l&nDrops\n "));
		loot.forEach(i => {
			chat(ChatLib.getCenteredText("&c" + i));
		})
		chat(" ");
	} else if (args[0].includes("add")) {
		let list = args.join(" ").replaceAll("add", "").substring(1).toUpperCase();
		data.chestContents.push(list);
		chat("&4" + list + "&c added to Insta-Buy list.");
		//oot.forEach(e => chat(e))
	} else if (args[0].includes("remove") || args[0].includes("delete")) {
		let list = args.join(" ").replaceAll("remove", "").replaceAll("delete", "").substring(1).toUpperCase();
		let contains = false;
		data.chestContents.forEach(ind => ind.toUpperCase().includes(list.toUpperCase()) ? contains = true : contains = false);
		if (contains) {
			data.chestContents = removeFromList(data.chestContents, list);
			chat("&4" + list + "&c removed from Insta-Buy list.");
		} else {
			chat("&4" + list + "&c isn't in Insta-Buy list.");
		}
	}
	data.save();
}).setName("drops");