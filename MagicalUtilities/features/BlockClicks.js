import Settings from "../Settings";
import { removeFromList, chat } from "../utils/Utils";


let clicks = 0;

const specialCases = [
	["SILVER", "LIGHT GRAY", "tile.cloth@8"],
	["WHITE", "BONE MEAL", "item.dyePowder@15"],
	["WHITE", "WOOL", "tile.cloth@0"],
	["WHITE", "BONE", "item.bone@0"],
	["BLACK", "INK SACK", "item.dyePowder@0"],
	["BLUE", "LAPIS LAZULI", "item.dyePowder@4"],
	["BROWN", "COCOA BEAN", "item.dyePowder@3"],
	["GREEN", "CACTUS", "tile.cactus@0"],
	["GREEN", "CACTUS GREEN", "item.dyePowder@2"],
	["RED", "ROSE", "tile.flower2@0"],
	["YELLOW", "DANDELION", "tile.flower1@0"],
	["PINK", "MAGENTA", "item.dyePowder@13"]
];

let toggled = true;

register("command", () => {
	if (!toggled) {
		toggled = true;
		chat("&eBlock clicks &aenabled");
	} else {
		toggled = false;
		chat("&eBlock clicks &cdisabled");
	}
}).setName("toggleterms");

let blockClicks = [];

register("postGuiRender", () => {
	try {
		let inv = Player.getOpenedInventory();
		if (inv.getName().includes("Select all the")) {
			let color = inv.getName().replaceAll("Select all the ", "").replaceAll(" items!", "");
			for (let i = 0; i < 53; i++) {
				if (!blockClicks.includes(i)) blockClicks.push(i);
				if (inv.getStackInSlot(i)?.getName()?.toUpperCase()?.includes(color)) {
					blockClicks = removeFromList(blockClicks, i);
				}
				specialCases.forEach(index => {
					if (color.includes(index[0])) {
						if ((inv.getStackInSlot(i)?.toString()?.includes(index[2]))) {
							blockClicks = removeFromList(blockClicks, i);
						}
					}
				})
			}
    	}
	} catch (e) { }
});

//  && gui.getSlotUnderMouse().field_75224_c.toString().includes("ContainerLocalMenu")

register("guiMouseClick", (mouseX, mouseY, mouseButton, gui, event) => {
    let inv = Player.getOpenedInventory();
	if (!Settings.opheliaToggle) return;
	if (inv.getName().includes("Ophelia")) {
		if (gui.getSlotUnderMouse().field_75224_c.toString().includes("ContainerLocalMenu")) {
			if (!(inv.getStackInSlot(gui.getSlotUnderMouse()?.slotIndex)?.getName()?.includes("Potion") || inv.getStackInSlot(gui.getSlotUnderMouse()?.slotIndex)?.getName()?.includes("Fill your Quiver"))) {
				clicks++;
				if (clicks < Settings.opheliaClicks) {
					cancel(event);
					chat("&aYou probably don't want to buy this. Click &2" + (Settings.opheliaClicks - clicks) + "&a more times if you would like to purchase " + inv.getStackInSlot(gui.getSlotUnderMouse()?.slotIndex)?.getName() + "&a!");
				} else {
					clicks = 0;
				}
			}
		}
	} else if (inv.getName().includes("What starts with:")) { 
		let letter = inv.getName().replaceAll("What starts with: ", "").replaceAll("'", "").replaceAll("?", "");
		let slotUnderMouse = gui.getSlotUnderMouse()?.slotIndex;
		if (inv.getStackInSlot(slotUnderMouse)?.getName()?.charAt(2)?.includes(letter)) return;
		cancel(event);
	} else if (inv.getName().includes("Select all the")) {
		if (blockClicks.includes(gui.getSlotUnderMouse()?.slotIndex)) cancel(event);
	}
});


register("guiClosed", () => { clicks = 0; blockClicks = []; })


























register("playerInteract", (action, vector3d, event) => {
	if (action.toString() == "RIGHT_CLICK_EMPTY" || action.toString() == "RIGHT_CLICK_BLOCK") {
		if (!Settings.gyroOff) return;
		if (Player.getHeldItem()?.getName()?.includes("Gyrokinetic Wand")) {
			cancel(event)
		}
	} 
})

