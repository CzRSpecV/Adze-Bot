//#region dependecies
var Discord = require('discord.js');
var cmdObj = require('../data/commands.json');
var stringHelper = require('../helpers/stringhelpers.js');
var Logging = require('../helpers/consolelogging.js');
//#endregion

var excludedcommands = ["Admin"];

//#region info command
function getInfo(message) {
    var txt = '**Bot Name:** Adze\n\n**Description:** Full Functionality Bot designed for the Pylos RSPS Discord Server by CzRSpecV & NobleWolf42!\nFeel free to join us on Discord at https://discord.gg/J3ejbBM or our website https://pylos.io/';

    const embMsg = new Discord.RichEmbed()
        .setTitle('Information')
        .setColor(34449)
        .setDescription(txt);
    message.author.send(embMsg);
    message.delete().catch(O_o=>{});
}
//#endregion

//#region Help function
function getHelp(adminbool, modbool, message, serverAdmin, BotOwner) {
    var txt = "";
    var sections = Object.keys(cmdObj);
    var title = "Help";
    var userInput = message.content.toLowerCase().split(' ');

    if((userInput[1] === "admin") || (userInput[1] === "mod") || (userInput[1] === "help") || (userInput[1] === "fun") || (userInput[1] === "pylos") || (userInput[1] === "music") || (userInput[1] === 'botowner') || (userInput.length === 1)) {
        
        if (userInput.length === 1) {
            txt = "\
            There are **" + getHelpSize(adminbool, sections) + "** pages of commands. \n \
            The pages are ";
    
            for(var ind in sections){
                if (!adminbool && sections[ind] =="Admin") { continue; }
                if (!serverAdmin && sections[ind] == "Server Admin") { continue; }
                txt += ("`" + sections[ind] + "`");
                if (ind < sections.length-1){
                    txt +=", ";
                }
            }
    
            txt += ". \n \n **Commands**: \n";
            for (key in cmdObj["Help"]) {
                txt += key + ' - ' + cmdObj["Help"][key] + '\n';
            }
        }
        else {
            title = stringHelper.capitalize(userInput[1]);
            if (sections.includes(title)) {
                for (key in cmdObj[title]) {
                    txt += key + ' - ' + cmdObj[title][key] + '\n';
                }
            }
        }

        if (!adminbool && title =="Admin") { 
            title="Access Denied";
            txt="You do not have access to those commands.";
        }
        else if(!modbool && title=="Mod"){
            title="Access Denied";
            txt="You do not have access to those commands.";
        }
        else if(!BotOwner && title=="BotOwner"){
            title="Access Denied";
            txt="You do not have access to those commands.";
        } else {
            title = (title=="Help"?title:"Help: "+title);
        }
    
        const embMsg = new Discord.RichEmbed()
            .setTitle(title)
            .setColor(0xb50000)
            .setDescription(txt);
        message.author.send(embMsg);
        message.delete().catch(O_o=>{});
    }
    else {
        title="Error:";
        txt="An invalid help command was processed. Please select a valid command.";
        const embMsg = new Discord.RichEmbed()
            .setTitle(title)
            .setColor(0xb50000)
            .setDescription(txt);
        message.author.send(embMsg);
        message.delete().catch(O_o=>{});
    }
}
//#endregion

//#region Help function helpers
function getHelpSize(adminbool, sections){
    var size = sections.length;
    // if the user isn't an admin
    if (!adminbool){
        for(var index in excludedcommands){
            if (sections.includes(excludedcommands[index])){
                size--;
            }
        }
    }

    return size;
}
//#endregion

//#region exports
module.exports = { getHelp, getInfo };
//#endregion