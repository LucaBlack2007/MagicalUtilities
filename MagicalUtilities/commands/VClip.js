import { clip_minusEight, clip_minusSix, clip_minusTwentySeven, clip_plusTen } from "../utils/Keybinds";

function clip(distance) {
    if (!typeof parseFloat(distance) == "number") return;
    Player.getPlayer().func_70107_b(
        Math.floor(Player.getX()) + 0.5,
        Player.getY() + parseFloat(distance),
        Math.floor(Player.getZ()) + 0.5
    )
}

register("command", (distance) => clip(distance)).setName("vclip");

//clip_minusEight, clip_minusTwentySeven, clip_plusTen, clip_minusSix 

register("tick", () => {

    if (clip_minusEight.isPressed()) clip(-8);
    if (clip_minusSix.isPressed()) clip(-6);
    if (clip_minusTwentySeven.isPressed()) clip(-27);
    if (clip_plusTen.isPressed()) clip(+10);

})

