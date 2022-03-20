    import Settings from "../Settings";
import RenderLib from "../../RenderLib/index";
 
register("renderEntity", (entity, pos, partialTicks, event) => {
	if (!Settings.starredESP) return;
	let name = entity.getName();
	const espBox = (x, y, z, height) => {
		RenderLib.drawEspBox(x, y-height, z, 0.9, height, Settings.starHitboxColor.red,Settings.starHitboxColor.green,Settings.starHitboxColor.blue, 1, true);
	}
	if (name.includes("✯") || name.includes("Shadow Assassin") || name.includes("Frozen Adventurer") || name.includes("Lost Adventurer")) {
		if (name.includes("Fel") || name.includes("Withermancer")) {
			espBox(entity.getX(), entity.getY(), entity.getZ(), 2.8);
            entity.getEntity().func_82142_c(false);
		} else {
			espBox(entity.getX(), entity.getY(), entity.getZ(), 1.9);
		}
	}
});
