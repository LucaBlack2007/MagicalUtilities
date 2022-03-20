register("command", (...friends) => {
	new Thread(() => {
		friends.forEach(index => {
			Thread.sleep(200);
			ChatLib.command("f remove " + index);
		});
	}).start();
}).setName("fremovegroup");