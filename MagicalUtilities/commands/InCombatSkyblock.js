register("command", () => {
	new Thread(() => {
		ChatLib.command("l");
		Thread.sleep(300);
		ChatLib.command("play sb");
		Thread.sleep(300);
		ChatLib.command("warp dungeon_hub");
	}).start();
}).setName("lb");