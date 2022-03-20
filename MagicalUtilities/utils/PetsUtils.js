import Settings from "../Settings";

let avoidList = [0,1,2,3,4,5,6,7,8,9,17,18,26,27,35,36,44];
let petsCmd = false;

export function equipPet(petName) {
	new Thread(() => {
		petsCmd = true;
		// let inv = Player.getOpenedInventory();
		ChatLib.command("pets");
		Thread.sleep(250);
		let inv = Player.getOpenedInventory();

		for (let i = 0; i < 53; i++) {
			let areEqual = false;
			if (!contains(i, avoidList) && i <= 44) {
				if (inv.getStackInSlot(i).getName().toUpperCase().includes(petName.toUpperCase())) areEqual = true;
				let lore = inv.getStackInSlot(i).getLore();
				if (areEqual) {		
					inv.click(i, false, "MIDDLE");
					if (Settings.debug) {
						if (lore[lore.length-3].includes("despawn")) {
							chat(inv.getStackInSlot(i).getName() + "&7: &atrue &7| &adespawned");
						} else {
							chat(inv.getStackInSlot(i).getName() + "&7: &atrue &7| &aequiped")
						}
					}
					return;
				} else {
					if (Settings.debug) chat(inv.getStackInSlot(i).getName() + "&7: &cfalse");
				}
			}
				
		}
		petsCmd = false;
	}).start();
}