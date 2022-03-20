import { C09PacketHeldItemChange, chat, data, rightClick } from "../utils/Utils";
import { sceptreBind } from "../utils/Keybinds";
import Settings from "../Settings";

let entities = []

register("tick", () => entities = World.getAllEntities());

const calcDistance = (entity) => {return Math.sqrt(Math.pow((Player.getX()-entity.getX()),2)+Math.pow((Player.getY()-entity.getY()),2)+Math.pow((Player.getZ()-entity.getZ()),2))}

const blacklisted = register("command", () => data.sceptreBlacklist.forEach(i => chat(i))).setName("blacklisted");

register("command", () => {
	if (!Settings.sceptreAura) {
		chat("turn on setting L");
		return;
	}

	entities.forEach(entity => {
		let name = entity.getName();
		if (name.includes("✯")) {
			chat(name);
		}
	})
	
}).setName("checkmobs");

register("tick", () => {
	if (sceptreBind.isPressed()) {
		if (Settings.sceptreAura) {
			chat("&7Sceptre Aura toggled &coff&7.");
			Settings.sceptreAura = false;
		} else {
			chat("&7Sceptre Aura toggled &aon&7.");
			Settings.sceptreAura = true;
		}
	}

	new Thread(() => {
		if (Settings.sceptreAura) {
			data.sceptreBlacklist.forEach(i => {
				if (Player.getHeldItem()?.getName()?.includes(i)) {
					return;
				}
			});
			
			entities.forEach(entity => {

				let name = "";
				
				try {
					name = entity.getName();
				} catch (e) { chat("null"); }

				if (name.includes("✯")) {
					if (calcDistance(entity) <= 6) {
						
						let sceptre;
						let itemSlot;
						let lastHeldItem = Player.getHeldItem();
						let lastHeldItemName = " ";
					

						for (let i = 0; i <= 7; i++){
							try {
								if (Player.getInventory().getItems()[i].getName().includes("Spirit Sceptre")){
									sceptre = i;
									break;
								}
							} catch(e) {}
						}

						for (let i = 0; i <= 7; i++){
							try {
								if (Player.getInventory().getItems()[i].getName().includes(lastHeldItem.getName())){
									itemSlot = i;
									break;
								}
								if (!(lastHeldItemName == " ")) {
									if (Player.getInventory().getItems()[i].getName().includes(lastHeldItem.getName())){
										itemSlot = i;
										break;
									}
								}
							} catch (e) {}
						}
						
						if (!(sceptre === undefined)) Client.sendPacket(new C09PacketHeldItemChange(sceptre));
						rightClick();
						try { if (!(itemSlot === undefined)) Client.sendPacket(new C09PacketHeldItemChange(itemSlot)); } catch (e) { }
						
					}
				}
			});
		}
	}).start();

});