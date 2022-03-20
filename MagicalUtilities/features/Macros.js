import { pickUpBowBind, shootBowBind, downtimeBind, anythingWithAnything } from "../utils/Keybinds";
import { rightClick, partyChat, C09PacketHeldItemChange } from "../utils/Utils";
import Settings from "../Settings";

let tickCounter = 0;

register("tick", () => {
    if (tickCounter % 5 === 0) { // 4 messages per second (highest before it caps)
        if (pickUpBowBind.isKeyDown() && Settings.chatMacro_pickUpBow) partyChat(Settings.message_pickUpBow);
        if (shootBowBind.isKeyDown() && Settings.chatMacro_shootBow) partyChat(Settings.message_shootBow);
        if (downtimeBind.isKeyDown() && Settings.chatMacro_downtime) partyChat(Settings.message_downtime);

        // ChatLib.chat(tickCounter); // DEBUG
    }
    tickCounter++;
});

register("tick", () => {
	let item;

	if (anythingWithAnything.isKeyDown()) {
		for (let i = 0; i <= 7; i++){
			try {
				if (Player.getInventory().getItems()[i].getName().includes(Settings.swapMacros)) {
					item = i;
					break;
				}
			} catch(e) {}
		}


		if (!(item === undefined)) Client.sendPacket(new C09PacketHeldItemChange(item));
		rightClick();

	}
})
