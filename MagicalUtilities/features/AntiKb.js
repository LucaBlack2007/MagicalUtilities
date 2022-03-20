import { chat, BlockPoss, S12PacketEntityVelocity, S27PacketExplosion } from "../utils/Utils";
import Settings from "../Settings";

register("packetReceived", (packet, event) => {
    if (Settings.antiKB) {
        if (
            packet instanceof S12PacketEntityVelocity && 
            packet.func_149412_c() == Player?.getPlayer()?.func_145782_y() && 
            !Player.getPlayer()?.func_180799_ab() &&
            !Player.getHeldItem()?.getName()?.includes("Bonzo's Staff") &&
            !Player.getHeldItem()?.getName()?.includes("Jerry-chine Gun") 
        ) { cancel(event); } else if (
            packet instanceof S27PacketExplosion && 
            !Player.getPlayer()?.func_180799_ab() &&
            !Player.getHeldItem()?.getName()?.includes("Bonzo's Staff") &&
            !Player.getHeldItem()?.getName()?.includes("Jerry-chine Gun") 
        ) {
            cancel(event);
        }
    }
});

register("command", () => {
    Settings.antiKB = Settings.antiKB = !Settings.antiKB;
    if (!Settings.antiKB) chat("&6Anti-knockback &7toggled &coff&7."); else chat("&6Anti-knockback &7toggled &aon&7.");
}).setName("antikb");