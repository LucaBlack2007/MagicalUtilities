import { chat, data } from "../utils/Utils";

register("command", () => {
    chat(data.apiKey === null ? "&cError: No API key set." : "&aYour key is: &e" + data.apiKey.toString());
}).setName("myapikey");

register("command", () => {
    chat(data.apiKey === null ? "&cError: No API key set." : "&aYour key is: &e" + data.apiKey.toString());
}).setName("mykey");