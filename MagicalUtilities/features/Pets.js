import Settings from "../Settings";
import { equipPet } from "../utils/PetsUtils";
import { chat } from "../utils/Utils";

register("command", (...n) => {
	if (n === undefined) {
		chat("&c/pet petName");
		return;
	}
	let name = "";
	n.forEach(index => name = name + " " + index);
	name = name.substring(1);
	equipPet(name);
}).setName("pet")

register("chat", (message, event) => {
	if (!Settings.jellyfish) return;

	new Thread(() => {
		if (message.toLowerCase().includes("active potion effects have been paused")) {
			Thread.sleep(1000)
			equipPet("Jellyfish");
		}
	}).start()
}).setChatCriteria("${message}");

register("chat", (message, event) => {
	if (!Settings.jellyfish) return;

	new Thread(() => {
		if (message.toLowerCase().includes("you can no longer consume or splash any potions during the remainder of this dungeon run!")) {
			Thread.sleep(150)
			equipPet("Golden Dragon");
		}
		let slot = 0;
	}).start()
}).setChatCriteria("${message}");