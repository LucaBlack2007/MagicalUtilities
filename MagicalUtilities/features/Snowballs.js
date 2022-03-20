import { C09PacketHeldItemChange, chat, data, rightClick, cycleSnowBall } from "../utils/Utils";
import { snowballBind } from "../utils/Keybinds";

register("tick", () => {
	if (snowballBind.isKeyDown()) {
		for (let i = 0; i <= 8; i++) {
			try {
				if (Player.getInventory().getItems()[i].getName().includes("Snowball")) {
                    Client.sendPacket(new C09PacketHeldItemChange(i)); 
                    for (let i = 0; i < 16; i++) { rightClick(); }
				}
			} catch(e) { if (!e.toString().includes("null")) chat(e.toString()); }
		}
	}
});




						