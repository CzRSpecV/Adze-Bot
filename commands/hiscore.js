var Discord = require('discord.js');
var xmlhttp = require("xmlhttprequest");
var Logging = require('../helpers/consolelogging.js');

//#region Variables
var PlayerName;

var TotalXP;
var TotalLvl;

var CookingXP;
var CookingLvl;

var WoodcuttingXP;
var WoodcuttingLvl;

var FletchingXP;
var FletchingLvl;

var FishingXP;
var FishingLvl;

var FiremakingXP;
var FiremakingLvl;

var CraftingXP;
var CraftingLvl;

var SmithingXP;
var SmithingLvl;

var MiningXP;
var MiningLvl;

var HerbloreXP;
var HerbloreLvl;

var AgilityXP;
var AgilityLvl;

var ThievingXP;
var ThievingLvl;

var SlayerXP;
var SlayerLvl;

var FarmingXP;
var FarmingLvl;

var RunecraftingXP;
var RunecraftingLvl;

var HunterXP;
var HunterLvl;

var ConstructionXP;
var ConstructionLvl;

var SummoningXP;
var SummoningLvl;

var DungXP;
var DungLvl;
//#endregion Variables

var XMLHttpRequest = xmlhttp.XMLHttpRequest;

function getHiscore(message, user_name) {
    try {
    var request = new XMLHttpRequest();

    request.open('GET', 'https://pylos.everythingrs.com/account/hiscores2/view/player/pylos/' + user_name, true);
    request.onload = function() {
        var data = JSON.parse(request.responseText)[0];

        if(request.status >= 200 && request.status < 400) {
            if(data != null) {
                if(data.username != 'Test') {
                PlayerName = data.username;
                TotalXP = data.overall_experience;
                TotalLvl = data.totalLevel;
                CookingXP = data.cooking_experience;
                WoodcuttingXP = data.woodcutting_experience;
                FletchingXP = data.fletching_experience;
                FishingXP = data.fishing_experience;
                FiremakingXP = data.firemaking_experience;
                CraftingXP = data.crafting_experience;
                SmithingXP = data.smithing_experience;
                MiningXP = data.mining_experience;
                HerbloreXP = data.herblore_experience;
                AgilityXP = data.agility_experience;
                ThievingXP = data.thieving_experience;
                SlayerXP = data.slayer_experience;
                FarmingXP = data.farming_experience;
                RunecraftingXP = data.runecrafting_experience;
                HunterXP = data.hunter_experience;
                ConstructionXP = data.construction_experience;
                SummoningXP = data.summoning_experience;
                DungXP = data.dungeoneering_experience;
                buildLevel();
                //#region Display Message
                var dispMsg =
                    '<:skill:686103004285370612> Total Level: ' + TotalLvl + ' - Total XP: ' + TotalXP + 
                    '\n\n<:Cooking:690740041273835561> Cooking Level: ' + CookingLvl + ' - Cooking XP: ' + CookingXP + 
                    '\n<:Woodcutting:690740041651322880> Woodcutting Level: ' + WoodcuttingLvl + ' - Woodcutting XP: ' + WoodcuttingXP + 
                    '\n<:Fletching:690740041227567175> Fletching Level: ' + FletchingLvl + ' - Fletching XP: ' + FletchingXP + 
                    '\n<:Fishing:690740041345138689> Fishing Level: ' + FishingLvl + ' - Fishing XP: ' + FishingXP + 
                    '\n<:Firemaking:690740041340682291> Firemaking Level: ' + FiremakingLvl + ' - Firemaking XP: ' + FiremakingXP + 
                    '\n<:Crafting:690740041307127818> Crafting Level: ' + CraftingLvl + ' - Crafting XP: ' + CraftingXP + 
                    '\n<:Smithing:690740041298739211> Smithing Level: ' + SmithingLvl + ' - Smithing XP: ' + SmithingXP + 
                    '\n<:Mining:690740041512779856> Mining Level: ' + MiningLvl + ' - Mining XP: ' + MiningXP + 
                    '\n<:Herblore:690740041366110291> Herblore Level: ' + HerbloreLvl + ' - Herblore XP: ' + HerbloreXP + 
                    '\n<:Agility:690740041336487967> Agility Level: ' + AgilityLvl + ' - Agility XP: ' + AgilityXP +
                    '\n<:Thieving:690740041680683017> Thieving Level: ' + ThievingLvl + ' - Thieving XP: ' + ThievingXP + 
                    '\n<:Slayer:690740041583951924> Slayer Level: ' + SlayerLvl + ' - Slayer XP: ' + SlayerXP + 
                    '\n<:Farming:690740041114189885> Farming Level: ' + FarmingLvl + ' - Farming XP: ' + FarmingXP + 
                    '\n<:Runecraft:690740041244213309> Runecrafting Level: ' + RunecraftingLvl + ' - Runecrafting XP: ' + RunecraftingXP + 
                    '\n<:Hunter:690740041428762725> Hunter Level: ' + HunterLvl + ' - Hunter XP: ' + HunterXP + 
                    '\n<:Summoning:690746111966838816> Summoning Level: ' + SummoningLvl + ' - Summoning XP: ' + SummoningXP +  
                    '\n<:Construction:690740041298870343> Construction Level: ' + ConstructionLvl + ' - Construction XP: ' + ConstructionXP + 
                    '\n<:Dung:690746112033816587> Dungeoneering Level: ' + DungLvl + ' - Dungeoneering XP: ' + DungXP;
                //#endregion Display Message
                const embMsg = new Discord.RichEmbed()
                        .setTitle('Hiscores - ' + PlayerName)
                        .setColor(32768)
                        .setDescription(dispMsg);
                message.channel.send(embMsg);
                Logging.addToLog('Success', 'Hiscore', message.author.username, message.author.id, message.channel.name);
                } else if(data.username === 'Test') {
                    const embMsg = new Discord.RichEmbed()
                        .setTitle('Invalid User!')
                        .setColor(0xb50000)
                        .setDescription('The user you are searching: ' + user_name + ' does not seem to exist on Hiscores!');
                    message.channel.send(embMsg);
                    Logging.addToLog('Warning', 'Hiscore', message.author.username, message.author.id, message.channel.name);
                }
            } else {
                const embMsg = new Discord.RichEmbed()
                        .setTitle('Invalid User!')
                        .setColor(0xb50000)
                        .setDescription('The user you are searching: ' + user_name + ' does not seem to exist on Hiscores!');
                message.channel.send(embMsg);
                Logging.addToLog('Warning', 'Highscore', message.author.username, message.author.id, message.channel.name);
            }
        } else {
            const embMsg = new Discord.RichEmbed()
                    .setTitle('API Is Down!')
                    .setColor(0xb50000)
                    .setDescription('Currently the API used for Hiscores is offline. Try again later.');
            message.channel.send(embMsg);
            Logging.addToLog('Error', 'Hiscore', message.author.username, message.author.id, message.channel.name);
        }
    }
    request.send();
} catch (err) { Logging.addToLog('Fatal Error', 'Hiscore', message.author.username, message.author.id, message.channel.name); }
}

function buildLevel() {
    CookingLvl = getLevelForXP(Number(CookingXP));
    WoodcuttingLvl = getLevelForXP(Number(WoodcuttingXP));
    FletchingLvl = getLevelForXP(Number(FletchingXP));
    FishingLvl = getLevelForXP(Number(FishingXP));
    FiremakingLvl = getLevelForXP(Number(FiremakingXP));
    CraftingLvl = getLevelForXP(Number(CraftingXP));
    SmithingLvl = getLevelForXP(Number(SmithingXP));
    MiningLvl = getLevelForXP(Number(MiningXP));
    HerbloreLvl = getLevelForXP(Number(HerbloreXP));
    AgilityLvl = getLevelForXP(Number(AgilityXP));
    ThievingLvl = getLevelForXP(Number(ThievingXP));
    SlayerLvl = getLevelForXP(Number(SlayerXP));
    FarmingLvl = getLevelForXP(Number(FarmingXP));
    RunecraftingLvl = getLevelForXP(Number(RunecraftingXP));
    HunterLvl = getLevelForXP(Number(HunterXP));
    ConstructionLvl = getLevelForXP(Number(ConstructionXP));
    SummoningLvl = getLevelForXP(Number(SummoningXP));
    DungLvl = getLevelForXP(Number(DungXP));
}

function getLevelForXP(exp) {
    var points = 0;
    var output;
    for (let lvl = 1; lvl <= 99; lvl++) {
        points += Math.floor(lvl + 300.0 * Math.pow(2.0, lvl / 7.0));
        output = Math.floor(points / 4);
        if (output >= exp) {
            return lvl;
        }
    }
    return 99;
}

module.exports = { getHiscore };