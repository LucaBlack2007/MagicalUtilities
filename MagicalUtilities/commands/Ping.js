let lastPingCommand, waitingPingCommand;

register("command", () => {
	lastPingCommand = new Date().getTime();
	waitingPingCommand = true;
	new Message(`&aCalculating Ping...`).setChatLineId(47564875).chat();
	ChatLib.command("fbkjgblsbnljhh");
}).setName("ping")

register("chat", (event) => {
	if (waitingPingCommand) {
		let ping = new Date().getTime() - lastPingCommand;
		ChatLib.clearChat(47564875);
		cancel(event);
		ChatLib.chat(`&7Current Ping: ${(ping <= 100 ? "&a" : ping <= 200 ? "&e" : "&c") + ping}ms`);
		waitingPingCommand = false;
	}
}).setCriteria(/&rUnknown command. Type \".+" for help.&r/);


register("chat", (event) => {
	if (waitingPingCommand) {
		let ping = new Date().getTime() - lastPingCommand;
		ChatLib.clearChat(47564875);
		cancel(event);
		ChatLib.chat(`&7Current Ping: ${(ping <= 100 ? "&a" : ping <= 200 ? "&e" : "&c") + ping}ms`);
		waitingPingCommand = false;
	}
}).setChatCriteria("Unknown command. Try /help for a list of commands");
