var Discord = require('discord.js');
var fs = require('fs');
var Logging = require('../helpers/consolelogging.js');
var staffFile = JSON.parse(fs.readFileSync('./data/staff.json', 'utf-8'));

function fixStaffFile(message) {
    reloadStaffFile();

    var userInput = message.content.toLowerCase().split(' ');
    var userWrite = message.content.split(' ');
    var inputChar = userWrite[3].split('');
    var userIn = "";
    for(let c = 0; c < userInput[3].length; c++) { if(inputChar[c] === '_') { inputChar[c] = ' '; } }
    for(let c = 0; c < userInput[3].length; c++) { userIn = userIn + inputChar[c]; }
    var FileLoad;
    var didPass = false;

    if((userInput.length < 4) || (userInput.length > 4)) {
        const embMsg = new Discord.RichEmbed()
            .setTitle('Invalid Edit!')
            .setColor(0xb50000)
            .setDescription('To edit a Staff Member use: !devfixstaff <DISCORD / IGN / STAFF / OTHER / ID> <Discord Name / Listed IGN / Current Snowflake ID> <NEW TEXT>');
        message.author.send(embMsg);
        Logging.addToLog('Warning', 'Dev Edit Staff List', message.author.username, message.author.id, message.channel.name);
    } else {
        if((userInput[1] === 'discord') || (userInput[1] === 'ign') || (userInput[1] === 'staff') || (userInput[1] === 'other') || (userInput[1] === 'id')) {
            for(let c = 0; c < staffFile.staff.length; c++) {
                FileLoad = staffFile.staff[c];
                staffChange = {};
                staffChange.DiscordName = FileLoad.DiscordName;
                staffChange.InGameName = FileLoad.InGameName;
                staffChange.StaffType = FileLoad.StaffType;
                staffChange.Other = FileLoad.Other;
                staffChange.SnowflakeID = FileLoad.SnowflakeID;

                switch(userInput[1]) {
                    case 'discord':
                        if((userInput[2] === FileLoad.DiscordName.toLowerCase() || (userInput[2] === FileLoad.InGameName.toLowerCase()) || (userInput[2] === FileLoad.SnowflakeID.toLowerCase()))) {
                            staffChange = {};
                            staffChange.DiscordName = userIn;
                            staffChange.InGameName = FileLoad.InGameName;
                            staffChange.StaffType = FileLoad.StaffType;
                            staffChange.Other = FileLoad.Other;
                            staffChange.SnowflakeID = FileLoad.SnowflakeID;
                            staffFile.staff[c] = staffChange;
                            didPass = true;
                        }
                        break;
                    case 'ign':
                        if((userInput[2] === FileLoad.DiscordName.toLowerCase() || (userInput[2] === FileLoad.InGameName.toLowerCase()) || (userInput[2] === FileLoad.SnowflakeID.toLowerCase()))) {
                            staffChange = {};
                            staffChange.DiscordName = FileLoad.DiscordName;
                            staffChange.InGameName = userIn;
                            staffChange.StaffType = FileLoad.StaffType;
                            staffChange.Other = FileLoad.Other;
                            staffChange.SnowflakeID = FileLoad.SnowflakeID;
                            staffFile.staff[c] = staffChange;
                            didPass = true;
                        }
                        break;
                    case 'staff':
                        if((userInput[2] === FileLoad.DiscordName.toLowerCase() || (userInput[2] === FileLoad.InGameName.toLowerCase()) || (userInput[2] === FileLoad.SnowflakeID.toLowerCase()))) {
                            staffChange = {};
                            staffChange.DiscordName = FileLoad.DiscordName;
                            staffChange.InGameName = FileLoad.InGameName;
                            staffChange.StaffType = userIn;
                            staffChange.Other = FileLoad.Other;
                            staffChange.SnowflakeID = FileLoad.SnowflakeID;
                            staffFile.staff[c] = staffChange;
                            didPass = true;
                        }
                        break;
                    case 'other':
                        if((userInput[2] === FileLoad.DiscordName.toLowerCase() || (userInput[2] === FileLoad.InGameName.toLowerCase()) || (userInput[2] === FileLoad.SnowflakeID.toLowerCase()))) {
                            staffChange = {};
                            staffChange.DiscordName = FileLoad.DiscordName;
                            staffChange.InGameName = FileLoad.InGameName;
                            staffChange.StaffType = FileLoad.StaffType;
                            staffChange.Other = userIn;
                            staffChange.SnowflakeID = FileLoad.SnowflakeID;
                            staffFile.staff[c] = staffChange;
                            didPass = true;
                        }
                        break;
                    case 'id':
                        if((userInput[2] === FileLoad.DiscordName.toLowerCase() || (userInput[2] === FileLoad.InGameName.toLowerCase()) || (userInput[2] === FileLoad.SnowflakeID.toLowerCase()))) {
                            staffChange = {};
                            staffChange.DiscordName = FileLoad.DiscordName;
                            staffChange.InGameName = FileLoad.InGameName;
                            staffChange.StaffType = FileLoad.StaffType;
                            staffChange.Other = FileLoad.Other;
                            staffChange.SnowflakeID = userIn;
                            staffFile.staff[c] = staffChange;
                            didPass = true;
                        }
                        break;
                    default:
                        staffFile.staff[c] = staffChange;
                }
            }
            if(didPass === true) {
                const embMsg = new Discord.RichEmbed()
                    .setTitle('Successful Edit!')
                    .setColor(32768)
                    .setDescription('Successfully edited user: ' + userWrite[2]);
                message.author.send(embMsg);
                Logging.addToLog('Success', 'Dev Edit Staff List', message.author.username, message.author.id, message.channel.name);
                message.delete().catch(O_o=>{});
                buildStaffFile();
            } else if(didPass === false) {
                const embMsg = new Discord.RichEmbed()
                    .setTitle('Failed Edit!')
                    .setColor(0xb50000)
                    .setDescription('Failed to edit user: ' + userWrite[2]);
                message.author.send(embMsg);
                Logging.addToLog('Warning', 'Dev Edit Staff List', message.author.username, message.author.id, message.channel.name);
                message.delete().catch(O_o=>{});
            }
        }
    }
}

function reloadStaffFile() {
    staffFile = JSON.parse(fs.readFileSync('./data/staff.json', 'utf-8'));
}

function buildStaffFile() {
    fs.writeFile('./data/staff.json', JSON.stringify(staffFile, null, 2), function(err) {
        if(err) {
            console.log(err);
            console.log('');
        }
        reloadStaffFile();
    });
}

module.exports = { fixStaffFile };