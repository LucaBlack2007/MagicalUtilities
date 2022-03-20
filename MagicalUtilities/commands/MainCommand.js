import request from "../../requestV2";
import Settings from "../Settings";
import { data, chat } from "../utils/Utils";

register("command", (...args) => {

    if (args === undefined) return Settings.openGUI();
    if (["setkey", "setapikey", "apikey", "api"].includes(args[0]) && !(args[1] === undefined)) {
        new Message(`&aChecking API key...`).setChatLineId(857684765).chat()
        request(`https://api.hypixel.net/key?key=${args[1]}`).then(stuff => {
            data.apiKey = args[1];
            data.save()
            ChatLib.editChat(857684765, new Message(`&aAPI Key set successfully!`))
        }).catch(error => { ChatLib.editChat(857684765, new Message("&cError: " + JSON.parse(error).cause)) })
    } else if ("help".includes(args[0])) {
        chat("&4/magical &cto open Help GUI. &4/magical setkey [apikey] &cto set an API Key.");
        return;
    } else {
        Settings.openGUI();
    }

}).setName("magical");

// Settings.openGUI()
// `&cError: ` + error.toString().replaceAll("{\"success\":false,\"cause\":\"", "").replaceAll("\"}", "")