let windowID = Player.getPlayer()?.field_71070_bA?.field_75152_c
let tried = false;
let inSBMenu = false;
let inPets = false;
let inWardrobe = false;
let swapSlot;

register("command", (slot) => {
	if (slot) {
		swapSlot = slot.removeFormatting();
		swapSlot = parseInt(swapSlot);
		ChatLib.command("pets");
		tried = true;
		inPets = true;
		inSBMenu = false;
		inWardrobe = false;
	}
}).setName("autowardrobe"); 

register("guiRender", (mouseX, mouseY, gui) => {
	// ChatLib.chat(windowID); 
	windowID = Player.getPlayer()?.field_71070_bA?.field_75152_c;
	if (tried) {
		if (Player?.getOpenedInventory()?.getName()?.toLowerCase()?.includes("pets")) {
			Client.getMinecraft().field_71442_b.func_78753_a(windowID + 0, 48, 2, 0, Player.getPlayer()); // Pets --> SB Menu
			// ------------------------------------------------------------------------------------------
			Client.getMinecraft().field_71442_b.func_78753_a(windowID + 1, 32, 2, 0, Player.getPlayer()); // SB Menu --> Wardrobe
			// ------------------------------------------------------------------------------------------
			Client.getMinecraft().field_71442_b.func_78753_a(windowID + 2, swapSlot + 35, 0, 0, Player.getPlayer()); // Wardrobe --> Armor Slot
			// ------------------------------------------------------------------------------------------
			Client.currentGui.close();
			tried = false;
		}
	}

});