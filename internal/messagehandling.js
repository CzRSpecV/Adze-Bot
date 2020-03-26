//#region Initalize
    //#region Dependancies
    var Discord = require('discord.js');
    var fs = require('fs');
    
    var Clear = require('../commands/clear.js');
    var Help = require('../commands/help.js');
    var Music = require('../commands/music.js');
    var userHandeling = require('../helpers/userHandling.js');
    var pfx = require('../commands/changeprefix.js');
    var AutoRole = require('../internal/autorole.js');
    var errormsg = require('../helpers/errormessages.js');
    var sconfig = JSON.parse(fs.readFileSync('./data/serverconfig.json', 'utf8'));
    var set = require('../commands/setsettings.js');
    var stringHelper = require('../helpers/stringhelpers.js');
    var Logging = require('../helpers/consolelogging.js');
    var Wiki = require('../commands/wiki.js');
    var PriceCheck = require('../commands/pricecheck.js');
    var PriceAdd = require('../commands/addprice.js');
    var PriceEdit = require('../commands/editprice.js');
    var StaffCheck = require('../commands/stafflist.js');
    var StaffAdd = require('../commands/addstaff.js');
    var StaffEdit = require('../commands/editstaff.js');
    var Hiscore = require('../commands/hiscore.js');
    var DiscordLeaderboard = require('../commands/leaderboard.js');
    var LeaderAdd = require('../helpers/leaderboardplus.js');
    var Market = require('../commands/market.js');
    //Bot Dev Access Dependancies
    var DevEditStaff = require('../commands/fixstaff.js');
    var DevConsoleLog = require('../commands/checklog.js');
    var DevResetLog = require('../commands/resetlog.js');
    var DevEditPrice = require('../commands/fixprice.js');
    //Auto Reset
    var logFile = JSON.parse(fs.readFileSync('./data/consolelog.json'));
    //#endregion Dependancies
    //Hard Code Vars
    let CMDCooldown = new Set();
    let CMD_CDSeconds = 5;
    let Cooldown = new Set();
    let CDSeconds = 1;
    var CD = false;
//#endregion Initalize

//#region Message Handling for Server
function messageHandling(client) {
    //Handels Messages and their responses
    client.on("message", message => {

        //#region Permission Checks
        // Checks to see if its Valid Channels   
        if ((Number(message.channel.id) != 684590756668768338) && (Number(message.channel.id) != 686100064841629700) && (Number(message.channel.id) != 684603518589337739) && (Number(message.channel.id) != 685013878266003467)) {
            return;
        }

        // Make sure bots can't run this command
        if (message.author.bot) return;

        // Make sure the command can only be run in a server
        if (!message.guild) return;
        //#endregion

        //#region Prefix Setup
        var serverid = message.channel.guild.id;
        var prefixFile = JSON.parse(fs.readFileSync('./data/botprefix.json', 'utf8'));

        if (prefixFile[serverid] != undefined) {
            if (prefixFile[serverid].prefix != undefined) {
                var prefix = prefixFile[serverid].prefix;
            }
            else {
                var prefix = "!";
            }
        }
        else {
            var prefix = "!";
        }
        //#endregion

        //#region Leaderboard Management
        // Cooldown for Leaderboard
        if(Cooldown.has(message.author.id)) {
            return;
        } else {
            Cooldown.add(message.author.id);
            setTimeout(() => {
                Cooldown.delete(message.author.id);
            }, CDSeconds * 1000)
            // Runs when the command isn't a prefix command, so it doesn't crash
            if(!message.content.startsWith(prefix)) {
                LeaderAdd.addToLeaderboard(message);
            }
        }
        //#endregion Leaderboard Managment

        //#region Standard Varibles
        var userInputNoLower = message.content.split(' ');
        var userInput = message.content.toLowerCase().split(' ');
        var noncommand = '';
        var command = userInput[0];
        var serverAdmin = message.member.hasPermission('ADMINISTRATOR');
        var userRoles = message.author.lastMessage.member._roles;
        var serverRoles = message.channel.guild.roles;
        
        if (userInput[1] != undefined) {
            if (!userInput[1].startsWith('http')) {
                var noncommand = stringHelper.combineArray(userInputNoLower, 1);
            }
            else {
                var noncommand = userInputNoLower[1];
            }
        }
        //#endregion

        //#region @Adze Call
        if(message.mentions.users.first() !== undefined) {
            if(message.mentions.users.first().id === '649123729800167456') {
                const embMsg = new Discord.RichEmbed()
                    .setTitle('Hi there!')
                    .setColor(0x00ffe7)
                    .setDescription('My name is Adze, a fully custom Discord Bot made for PylosPK RSPS!\nI can tell you what I do by doing **!help** or **!info**\nYou can find us at https://pylospk.com\n\nFramework provided by my good friend NobleWolf42, and written by CzRSpecV. If you have any suggestions feel free to DM me at: CzRSpecV#1805');
                message.channel.send(embMsg);
                return;
            }
        }
        //#endregion

        //#region Disabled Commands
        /*
        //#region Setup Command
        if (!(serverid in sconfig)) {
            if ((command == (prefix + 'setup')) && (serverAdmin)) {
                set.setup(message);
            }
            return;
        };
        //#endregion
        */

        /*
        //#region Setting Commands
        if ((command == (prefix + 'set')) && (serverAdmin)) {

            if (userInput[1] == 'autorole') {
                sconfig = set.setAutorole(message);
                return;
            }
            else if (userInput[1] == 'joinrole') {
                sconfig = set.setJoinrole(message);
                return;
            }
            else if (userInput[1] == 'general') {
                sconfig = set.setGeneral(message);
                return;
            }
            else if (userInput[1] == 'music') {
                sconfig = set.setMusic(message);
                return;
            }
            else if (userInput[1] == 'modmail') {
                sconfig = set.setModMail(message);
            }
            else {
                errormsg.custom(message, 'Invalid command, valid commands are `!set` `autorole, joinrole, general, modmail, and music`');
                return;
            }
        }
        else if ((command == (prefix + 'set')) && (!serverAdmin)) {
            errormsg.noServerAdmin(message);
        }
        //#endregion
        */
        //#endregion Temp. Disable

        //#region Role Check Variables
        var adminTF = userHandeling.adminCheck(userRoles, serverRoles, serverid);
        var modTF = userHandeling.modCheck(userRoles, serverRoles, serverid);
        var djTF = userHandeling.djCheck(userRoles, serverRoles, serverid);

        var BotOwner = false
        if (message.author.id.toString() === '134900859560656896') { BotOwner = true; } else if(message.author.id.toString() !== '134900859560656896') { BotOwner = false; }
        //#endregion

        //#region Commands Begin
        
        //#region Prefix Startup
        if (!message.content.startsWith(prefix)) return;
        //#endregion

        //#region Command Cooldown Begin
        if(CMDCooldown.has(message.author.id)) {
            message.delete();
            CD = true;
            return message.channel.send('Hey ' + message.author.username + '! You must wait 5 seconds before using another command!');
        } else {
            if((!BotOwner) || message.member.hasPermission('ADMINISTRATOR')) { CMDCooldown.add(message.author.id); }
            CD = false;
            setTimeout(() => {
                CMDCooldown.delete(message.author.id);
            }, CMD_CDSeconds * 1000)
        }
        //#endregion Command Cooldown End
    if (CD === false) {

        //#region Setup / Admin Commands

        //#region AutoRole Commands
        //Runs AutoRole Message Generation
        if ((command === (prefix + 'createautorolemsg') && (BotOwner))) {
            if (!sconfig[serverid].autorole.enable) {
                errormsg.disabled(message, 'autorole');
                return;
            }
            else {
                AutoRole.sendRoleMessage(message, serverid, client);
                message.delete().catch(O_o=>{});
                return;
            }
        }
        else if ((command === (prefix + 'createautorolemsg') && (!BotOwner))) {
            const embMsg = new Discord.RichEmbed()
                    .setTitle('Restricted Access!')
                    .setColor(0xb50000)
                    .setDescription('Only the Bot Owner, CzRSpecV#1805 can trigger Auto Role.');
            message.channel.send(embMsg);
            Logging.addToLog('Restricted', 'Auto Role', message.author.username, message.author.id, message.channel.name);
            return;
        }
        //#endregion

        //#region Prefix Command
        if((command === (prefix + 'changeprefix')) && (adminTF)) {

            var isSymbol = /[`~!$%^&*()_+-={}[\]\|\\:";'<>?,.\/]/;

            if(userInput[1] != undefined) {
                if ((userInput[1].length == 1) && (isSymbol.test(userInput[1]))){
                    pfx.prefixChange(userInput[1], serverid);

                    const embMsg = new Discord.RichEmbed()
                        .setTitle('Current Prefix:')
                        .setColor(32768)
                        .setDescription('Current Prefix is ' + userInput[1]);
                    message.channel.send(embMsg);
                    return;
                }
                else {
                    const embMsg = new Discord.RichEmbed()
                        .setTitle('Error!')
                        .setColor(0xb50000)
                        .setDescription('Bot Prefix Must be one of the following: ````~!$%^&*()_+-={}[]|\:";\'<>?,./```');
                    message.channel.send(embMsg);
                    return;
                }
            }
            else {
                const embMsg = new Discord.RichEmbed()
                    .setTitle('Error!')
                    .setColor(0xb50000)
                    .setDescription('You must define a bot prefix.');
                message.channel.send(embMsg);
                return;
            }
        }
        else if((command === (prefix + 'changeprefix')) && (!adminTF)) {
            errormsg.noAdmin(message);
            return;
        }
        //#endregion

        //#region Temp. Disable
        /*
        //#region Register
        if (command == (prefix + 'register')) {
            userHandeling.refreshUser();
            if (message.author.id in userAccountInfo) {
                var txt = `You Have Already Registered.\nThe last time you updated your info was ${userAccountInfo[message.author.id].time}\n If you wish to update you info now, please click on this link: ${bconfig.general.registerLink}`;
                var color = 2385434;
            }
            else {
                var txt = `Click on this link to register: ${bconfig.general.registerLink}`;
                var color = 0xb50000;
            }

            const embMsg = new Discord.RichEmbed()
                .setTitle('Register')
                .setColor(color)
                .setDescription(txt);
            message.author.send(embMsg);
            message.delete().catch(O_o=>{})
            return;
        }
        //#endregion
        */
        //#endregion Temp. Disable

        //#region Temp. Disable
        /*
        //#region AddMod
        if (command == (prefix + 'addmod') && (adminTF) && (message.mentions.members.first() != undefined)) {
            // Call Torture helper function
            message.mentions.members.forEach((member) => {
                sconfig = set.addMod(message, member);
            });
            return;
        }
        else if (command == (prefix + 'addmod') && (!adminTF)) {
            errormsg.noAdmin(message);
            return;
        }
        else if (command == (prefix + 'addmod') && (message.mentions.members.first() == undefined)) {
            errormsg.custom(message, 'You must specify a user to addmod to! Command is !addmod @USERS.');
            return;
        }
        //#endregion
        */
        //#endregion Temp. Disable

        //#region Chat Clear
        if((command === (prefix + 'clear')) && (adminTF)) {
            Clear.clearMessages(message);
            return;
        }
        else if ((command === (prefix + 'clear')) && (!adminTF)) {
            errormsg.noAdmin(message);
            return;
        }
        //#endregion

        //#endregion Setup / Admin Commands

        //#region Info / Help
        if (command == (prefix + 'info')) {
            Help.getInfo(message);
        }
        if(command === (prefix + 'help')) {
            Help.getHelp(adminTF, modTF, message, serverAdmin, BotOwner);
        }
        //#endregion

        //#region Music Bot Commands
        if (((command == (prefix + 'play') || (command == (prefix + 'skip')) || (command == (prefix + 'stop')) || (command == (prefix + 'pause')) || (command == (prefix + 'resume'))))) {
            if (!sconfig[serverid].music.enable) {
                errormsg.disabled(message, 'music');
            }
            else if (sconfig[serverid].music.textChannel != message.channel.name) {
                errormsg.wrongChannel(message, sconfig[serverid].music.textChannel);
                return;
            }
            else if (!djTF) {
                errormsg.noDJ(message);
                return;
            }
        }
        else if ((command == (prefix + 'volume')) && (!modTF)) {
            errormsg.noMod(message);
            return;
        }
        else if ((command == (prefix + 'nowplaying')) || (command == (prefix + 'showqueue'))) {
            if (!sconfig[serverid].music.enable) {
                errormsg.disabled(message, 'music');
                return;
            }
            else if (sconfig[serverid].music.textChannel != message.channel.name) {
                errormsg.wrongChannel(message, sconfig[serverid].music.textChannel);
                return;
            }
        }

        if (sconfig[serverid].music.textChannel == message.channel.name) {
            if (djTF == true) {
                if (command == (prefix + 'play')) {
                    Music.execute(message, noncommand);
                    return;
                }
                else if (command == (prefix + 'skip')) {
                    Music.skip(message);
                    return;
                }
                else if (command == (prefix + 'stop')) {
                    Music.stop(message);
                    return;
                }
                else if (command == (prefix + 'pause')) {
                    Music.pause(message);
                    return;
                }
                else if (command == (prefix + 'resume')) {
                    Music.resume(message);
                    return;
                }
            }
            
            if (command == (prefix + 'nowplaying')) {
                Music.nowPlaying(message);
                return;
            }
            else if (command == (prefix + 'showqueue')) {
                Music.showQueue(message);
                return;
            }
        }
        if(modTF == true || adminTF == true) {
            if (command == (prefix + 'volume')) {
                Music.volume(message, userInput[1]);
                return;
            }
        }
        //#endregion

        //#region Pylos Features

        //#region Add To Prices.json
        if((command === (prefix + 'addprice')) && (adminTF)) {
            PriceAdd.addToPrice(message);
        } else if((command === (prefix + 'addprice')) && (!adminTF)) {
            errormsg.noAdmin(message);
        }
        //#endregion

        //#region Edit Prices.json
        if((command === (prefix + 'editprice')) && (modTF)) {
            PriceEdit.editPriceFile(message);
        } else if((command === (prefix + 'editprice')) && (!modTF)) {
            errormsg.noMod(message);
        }
        //#endregion

        //#region Price Check
        if (command == (prefix + 'pc')) {
            PriceCheck.priceMessage(message);
        }
        //#endregion

        //#region Wiki Info
        if (command === (prefix + 'wiki')) {
            Wiki.wikiMessage(message);
        }
        //#endregion

        //#region Staff List Commands
        //Lookup Staff List
        if (command === (prefix + 'staff')) {
            StaffCheck.checkStaffList(message);
        }
        
        //Add To Staff List
        if ((command === (prefix + 'addstaff')) && (adminTF)) {
            StaffAdd.addToStaff(message);
        } else if(command === (prefix + 'addstaff') && (!adminTF)) {
            errormsg.noAdmin(message);
            Logging.addToLog('Warning', 'Add Staff', message.author.username, message.author.id, message.channel.name);
        }
        //Edit Staff List
        if (command === (prefix + 'editstaff')) {
            StaffEdit.editStaffFile(message);
        }
        //#endregion

        //#region In Game Highscores
        if (command === (prefix + 'hiscore')) {
            Hiscore.getHiscore(message, message.content.toLowerCase().substring(9));
        }
        //#endregion In Game Highscores

        //#region Player Market Listings
        if (command === (prefix + 'addmarket')) {
            //Market.addToMarket(message);
            message.channel.send('Currently this feature is a WIP!');
        }

        if (command === (prefix + 'editmarket')) {
            //Market.editMarket(message);
            message.channel.send('Currently this feature is a WIP!');
        }

        if (command === (prefix + 'deletemarket')) {
            //Market.removeFromMarket(message);
            message.channel.send('Currently this feature is a WIP!');
        }
        //#endregion Player Market Listings

        //#endregion Pylos Features

        //#region Bot Owner Commands

        //#region Fix Staff
        if ((command === (prefix + 'devfixstaff')) && (BotOwner)) {
            DevEditStaff.fixStaffFile(message);
        } else if ((command === (prefix + 'devfixstaff')) && (!BotOwner)) {
            const embMsg = new Discord.RichEmbed()
                    .setTitle('Restricted Access!')
                    .setColor(0xb50000)
                    .setDescription('Only the Bot Owner, CzRSpecV#1805 can edit restricted staff member info.');
            message.channel.send(embMsg);
            Logging.addToLog('Restricted', 'Fix Staff', message.author.username, message.author.id, message.channel.name);
        }
        //#endregion Fix Staff

        //#region Call Log
        if ((command === (prefix + 'devchecklog')) && (BotOwner)) {
            DevConsoleLog.viewConsoleLog(message);
        } else if ((command === (prefix + 'devchecklog')) && (!BotOwner)) {
            const embMsg = new Discord.RichEmbed()
                    .setTitle('Restricted Access!')
                    .setColor(0xb50000)
                    .setDescription('Only the Bot Owner, CzRSpecV#1805 can view bot logs.');
            message.channel.send(embMsg);
            Logging.addToLog('Restricted', 'Bot Log', message.author.username, message.author.id, message.channel.name);
        }
        //#endregion Call Log

        //#region Reset Log
        if ((command === (prefix + 'devresetlog')) && (BotOwner)) {
            DevResetLog.resetLogfile(message);
        } else if ((command === (prefix + 'devresetlog')) && (!BotOwner)) {
            const embMsg = new Discord.RichEmbed()
                    .setTitle('Restricted Access!')
                    .setColor(0xb50000)
                    .setDescription('Only the Bot Owner, CzRSpecV#1805 can reset the Bots Console Log.');
            message.channel.send(embMsg);
            Logging.addToLog('Restricted', 'Reset Console Log', message.author.username, message.author.id, message.channel.name);
        }
        //#endregion Reset Log

        //#region Fix Prices
        if ((command === (prefix + 'devfixprice')) && (BotOwner)) {
            DevEditPrice.devFixPrice(message);
        } else if ((command === (prefix + 'devfixprice')) && (!BotOwner)) {
            const embMsg = new Discord.RichEmbed()
                    .setTitle('Restricted Access!')
                    .setColor(0xb50000)
                    .setDescription('Only the Bot Owner, CzRSpecV#1805 can fix the Prices Database.');
            message.channel.send(embMsg);
            Logging.addToLog('Restricted', 'Fix Prices', message.author.username, message.author.id, message.channel.name);
        }
        //#endregion Fix Prices

        //#endregion Bot Owner Commands

        //#region Fun Commands

        //#region Discord Leaderboards
        if (command === (prefix + 'discordlb')) {
            DiscordLeaderboard.viewLeaderboard(message);
        }
        //#endregion Discord Leaderboards

        //#endregion Fun Commands

        //THIS MUST BE AT THE BOTTOM OF THE CLIENT.ON
        //#region Log File Checking and Resetting
        reloadLogJSON();
        if(logFile.logging.length > 100) {
            Logging.fatalErrorLogging(client);
        }
        //#endregion

        //#endregion Commands End
    }
    });
}
//#endregion

//#region Log File Reset
function reloadLogJSON() {
    logFile = JSON.parse(fs.readFileSync('./data/consolelog.json'));
}
//#endregion Log File Reset

//#region updatesconfig function
async function updatesconfig() {
    sconfig = await set.updateConfigFile();
};
//#endregion

//#region exports
module.exports = { messageHandling };
//#endregion exports