import Settings from "../Settings";
import { ghostBind } from "../utils/Keybinds";
import { BlockPoss } from "../utils/Utils";

const exclude = [
	"minecraft:lever",
	"minecraft:stone_button",
	"minecraft:chest",
	"minecraft:trapped_chest"
]

register("tick", () => {
	if (ghostBind.isKeyDown() && Settings.ghostBlocks) {
		const la = Player.lookingAt()
		if (la.getClass() !== Block || exclude.includes(la.type.getRegistryName())) { return }
		World.getWorld().func_175698_g(new BlockPoss(la.getX(), la.getY(), la.getZ()))
	}
});