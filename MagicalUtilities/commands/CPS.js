import { chat } from "../utils/Utils";

let started = false;
let time = null;
let cps = 0;
let oldcps = 0;

register("command", () => {
    started = !started;
    if (started) {
        new Thread(() => {
            time = Date.now();
            new Message(`&aCalculating CPS... Click as fast as you can!`).setChatLineId(857684765).chat();
            Thread.sleep(1000);
            ChatLib.editChat(857684765, new Message(`&aCPS: ${cps}`))
        }).start();
    }
}).setName("cps");

register("playerInteract", (action, vector3d, event) => {
	if (action.toString() == "RIGHT_CLICK_EMPTY" || action.toString() == "RIGHT_CLICK_BLOCK") {
		if (started) {
            cps++;
            chat(oldcps)
            if (Date.now() - time > 1000) {
                oldcps = cps;
                cps = 0;
                time = Date.now();
            }
        }
	} 
})
