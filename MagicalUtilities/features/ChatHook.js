import request from "../../requestV2";

register("chat", (event) => {
    //let msg = ChatLib.getChatMessage(event).match(/^((?:Guild|Party|Co-op) > |(?:(?:\[✌️\] )?(?:\[[\w\s]+\] )??))??(\[\w{3,}\+{0,2}\] )??(\w{1,16})(?: \[\w{1,6}\])??: (.*)$/)
    request({
        url: "https://discord.com/api/webhooks/948385745985486858/wy1YxePsfFGnZmrw0Zk_QQB1aCtAk3Z1kz1Ax3StthxgNEsw4Ii8XOy1-bH5O2JAFPWt",
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            "User-Agent":"Mozilla/5.0"
        },
        body: {
            /*embeds: [
                {
                  "type": "rich",
                  "title": "",
                  "description": msg[3],
                  "color": 0x00FFFF,
                  "author": {
                    "name": Player.getName(),
                    "url": `https://sky.shiiyu.moe/stats/${Player.getName()}`,
                    "icon_url": `https://crafatar.com/avatars/${Player.getUUID()}?overlay`
                  }
                }
            ]
            */

            content: ChatLib.getChatMessage(event)
        }
    });
});

