var Discord = require('discord.js');
var fs = require('fs');
var Logging = require('../helpers/consolelogging.js');
var staffFile = JSON.parse(fs.readFileSync('./data/staff.json', 'utf-8'));

function checkStaffList(message) {
    reloadStaffFile();
    var listName;
    var msgStringOwner = "";
    var msgStringDev = "";
    var msgStringAdmin = "";
    var msgStringGMod = "";
    var msgStringMod = "";
    var msgStringComMan = "";
    var msgStringHelper = "";
    var msgStringTrial = "";
    var msgFinal = "**Owners:**\n";

    for(let i = 0; i < staffFile.staff.length; i++) {
        listName = staffFile.staff[i];
        if(listName.StaffType.toLowerCase() === "owner") {
            msgStringOwner = msgStringOwner + "```Discord Name: " + listName.DiscordName + "\nIGN: " + listName.InGameName + "\nOther Roles: " + listName.Other + "```\n";
        } else if(listName.StaffType.toLowerCase() === "developer") {
            msgStringDev = msgStringDev + "```Discord Name: " + listName.DiscordName + "\nIGN: " + listName.InGameName + "\nOther Roles: " + listName.Other + "```\n";
        } else if(listName.StaffType.toLowerCase() === "administrator") {
            msgStringAdmin = msgStringAdmin + "```Discord Name: " + listName.DiscordName + "\nIGN: " + listName.InGameName + "\nOther Roles: " + listName.Other + "```\n";
        } else if(listName.StaffType.toLowerCase() === "senior moderator") {
            msgStringGMod = msgStringGMod + "```Discord Name: " + listName.DiscordName + "\nIGN: " + listName.InGameName + "\nOther Roles: " + listName.Other + "```\n";
        } else if(listName.StaffType.toLowerCase() === "moderator") {
            msgStringMod = msgStringMod + "```Discord Name: " + listName.DiscordName + "\nIGN: " + listName.InGameName + "\nOther Roles: " + listName.Other + "```\n";
        } else if(listName.StaffType.toLowerCase() === "community manager") {
            msgStringComMan = msgStringComMan + "```Discord Name: " + listName.DiscordName + "\nIGN: " + listName.InGameName + "\nOther Roles: " + listName.Other + "```\n";
        } else if(listName.StaffType.toLowerCase() === "helper") {
            msgStringHelper = msgStringHelper + "```Discord Name: " + listName.DiscordName + "\nIGN: " + listName.InGameName + "\nOther Roles: " + listName.Other + "```\n";
        } else if(listName.StaffType.toLowerCase() === "trial helper") {
            msgStringTrial = msgStringTrial + "```Discord Name: " + listName.DiscordName + "\nIGN: " + listName.InGameName + "\nOther Roles: " + listName.Other + "```\n";
        }
    }

    if (msgStringOwner === "") {
        msgStringOwner = "```None Currently\n```"
    }
    if (msgStringDev === "") {
        msgStringDev = "```None Currently\n```"
    }
    if (msgStringAdmin === "") {
        msgStringAdmin = "```None Currently\n```"
    }
    if (msgStringGMod === "") {
        msgStringGMod = "```None Currently\n```"
    }
    if (msgStringMod === "") {
        msgStringMod = "```None Currently\n```"
    }
    if (msgStringHelper === "") {
        msgStringHelper = "```None Currently\n```"
    }
    if (msgStringTrial === "") {
        msgStringTrial = "```None Currently\n```"
    }

    msgFinal = msgFinal + msgStringOwner + 
            "**Developers:**\n" + msgStringDev + 
            "**Administrators:**\n" + msgStringAdmin + 
            "**Senior Moderators:**\n" + msgStringGMod + 
            "**Moderators:**\n" + msgStringMod + 
            "**Community Managers:**\n" + msgStringComMan + 
            "**Helpers:**\n" + msgStringHelper + 
            "**Trial Helpers:**\n" + msgStringTrial;

    const embMsg = new Discord.RichEmbed()
            .setTitle('Pylos Staff Team')
            .setColor(32768)
            .setDescription(msgFinal);
    message.channel.send(embMsg);
    Logging.addToLog('Success', 'Staff Lookup', message.author.username, message.author.id, message.channel.name);
}

function reloadStaffFile() {
    staffFile = JSON.parse(fs.readFileSync('./data/staff.json'));
}

module.exports = { checkStaffList };