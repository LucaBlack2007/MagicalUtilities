import { @Vigilant, @NumberProperty, @TextProperty, @SelectorProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @SliderProperty, Color } from 'Vigilance';

@Vigilant("MagicalUtilities")
class Settings {

    @SwitchProperty({
        name: "Toggle Insta-Buy",
        description: "Toggles Insta-Buy on/off.",
        category: "Dungeons",
        subcategory: "Chest Shit"
    }) instabuy = false;

    @SwitchProperty({
        name: "Ophelia Block Clicks",
        description: "Cancel click packets of non-potion/arrow items in Ophelia.",
        category: "Misc",
        subcategory: "Ophelia"
    }) opheliaToggle = false;
    
    @SliderProperty({
        name: "Ophelia Override Clicks",
        description: "Clicks required to purchase non-potion/arrow items in Ophelia.",
        category: "Misc",
        subcategory: "Ophelia",
        max: 15,
        min: 0
    }) opheliaClicks = 5;

    //

    @TextProperty({
        name: "Swap Macros",
        description: "/cooldown amount in miliseconds",
        category: "Macros",
        subcategory: "Swaps"
    }) swapMacros = "";

    @SwitchProperty({
        name: "Block Cells Alignment",
        description: "Stops you from using Cells Alignment.",
        category: "Dungeons",
        subcategory: "Misc"
    }) gyroOff = true;

    @SwitchProperty({
        name: "QOL Spirit Sceptre",
        description: "Shoots spirit sceptre when you get near a starred mob.",
        category: "Dungeons",
        subcategory: "Spirit Sceptre"
    }) sceptreAura = false;

    @SwitchProperty({
        name: "AutoPet Debug",
        description: "Sends when it's filtering through pets",
        category: "Auto Pet",
        subcategory: "Debug"
    }) debug = false;

    @SwitchProperty({
        name: "Terminator Autoclicker",
        description: "Spam terminator while holding right click.",
        category: "Dungeons",
        subcategory: "Terminator QOL",
    }) terminatorToggled = false;

    @SliderProperty({
        name: "Terminator CPS",
        description: "Select CPS that the terminator clicks at.",
        category: "Dungeons",
        subcategory: "Terminator QOL",
        min: 5,
        max: 500,
    }) terminatorCPS = 5;

    @TextProperty({
        name: "Right-click AC Weapon",
        description: "Select the item that is autoclicked.",
        category: "Dungeons",
        subcategory: "Terminator QOL",
    }) item = "";

    @SwitchProperty({
        name: "Ghost Blocks",
        description: "Create ghost blocks with a keybind (in controls)",
        category: "Dungeons",
        subcategory: "Ghost Blocks"
    }) ghostBlocks = false;

    @SwitchProperty({
        name: "Jellyfish QOL",
        description: "Equip jellyfish upon joining a dungeon and change to golden dragon after drinking potion.",
        category: "Auto Pet",
        subcategory: "Jellyfish QOL"
    }) jellyfish = false;

    

    // macros

    // PICK UP BOW
    @SwitchProperty({
        name: "Pick Up Bow Spam",
        description: "Spam \"PICK UP BOW\" in chat while holding a keybind (in controls)",
        category: "Macros",
        subcategory: "Pick Up Bow (M4)",
    }) chatMacro_pickUpBow = false;

    @TextProperty({
        name: "Pick Up Bow Message",
        description: "Type what you would like the pick up bow message to be.",
        category: "Macros",
        subcategory: "Pick Up Bow (M4)",
    }) message_pickUpBow = "PICK UP BOW";

    // Shoot Bow Spam

    @SwitchProperty({
        name: "Shoot Bow Spam",
        description: "Spam \"SHOOT BOW\" in chat while holding a keybind (in controls)",
        category: "Macros",
        subcategory: "Shoot Bow (M4)",
    }) chatMacro_shootBow = false;

    @TextProperty({
        name: "Shoot Bow Message",
        description: "Type what you would like the shoot bow message to be.",
        category: "Macros",
        subcategory: "Shoot Bow (M4)",
    }) message_shootBow = "SHOOT BOW";

    // DOWNTIME

    @SwitchProperty({
        name: "Downtime Spam",
        description: "Spam \"WTF DT\" in chat while holding a keybind (in controls)",
        category: "Macros",
        subcategory: "Downtime",
    }) chatMacro_downtime = false;

    @TextProperty({
        name: "Shoot Bow Message",
        description: "Type what you would like the downtime bow message to be.",
        category: "Macros",
        subcategory: "Downtime",
    }) message_downtime = "WTF DT";

    @SwitchProperty({
        name: "Auto Wardrobe",
        description: "use /autowardrobe [number] to automatically equip that wardrobe slot.",
        category: "Macros",
        subcategory: "Auto Wardrobe"
    }) autoWardrobe = false;
    
    @SwitchProperty({
        name: "Starred Mob ESP",
        description: "Puts a box around any starred mob.",
        category: "ESP"
    }) starredESP = false;

    @ColorProperty({
        name: "Mob ESP Color",
        description: "Chose the color to show in your ESP.",
        category: "ESP"
    }) starHitboxColor = Color.RED;

    @SwitchProperty({
        name: "Anti-knockback",
        description: "Stops you from taking any knockback.",
        category: "Dungeons",
        subcategory: "Anti-knockback"
    }) antiKB = false;


    
    constructor() {
        this.initialize(this);

        this.setCategoryDescription("Auto Pet", 
            "&c&lMagical Utilities\n\n" +
            "&e/magical &8- &aMain GUI command.\n" +
            "&e/magical api <api_key> &8- &aSet your API key.\n" +
            "\n" +
            "&e/vclip [+/-amount] &8- &aTeleports you vertically up or down.\n" +
            "&e/autowardrobe <slot> &8- &aPuts on armor set in slot.\n" +
            "&e/drops [add|remove|list] [<drop>] &8- &aAuto-buy chest list.\n" +
            "&e/pet <pet> &8- &aEquips the pet you named.\n" +
            "&e/toggleterms &8- &aToggles block clicks on terminals.\n" +
            "&e/myapikey &8- &aShow stats about your API key.\n" +
            "&e/fremovegroup <friends> &8- &aRemoves friends in bulk.\n" +
            "&e/ping &8- &aShow your ping." 
        )
    }
}

export default new Settings;