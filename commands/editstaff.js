var Discord = require('discord.js');
var fs = require('fs');
var Logging = require('../helpers/consolelogging.js');
var staffFile = JSON.parse(fs.readFileSync('./data/staff.json', 'utf-8'));

function editStaffFile(message) {
    try {
    refreshStaffFile();

    //Edit Vars
    var userInput = message.content.toLowerCase().split(' ');
    var userWrite = message.content.split(' ');
    var FileLoad;
    var ThrowError = true;

    if((userInput.length < 3) || (userInput.length > 3)) {
        const embMsg = new Discord.RichEmbed()
            .setTitle('Invalid Edit!')
            .setColor(0xb50000)
            .setDescription('To edit yourself in the staff list use: !editstaff <discord / ign / other> <NEW TEXT>');
        message.channel.send(embMsg);
        Logging.addToLog('Warning', 'Edit Staff List', message.author.username, message.author.id, message.channel.name);
    } else {

        if((userInput[1] === 'discord') || (userInput[1] === 'ign') || (userInput[1] === 'other')) {
            var inputChangeChar = userWrite[2].split('');
            var NewInputChange = '';
            var BreakLoop = false;

            //Splicing and Rebuild for Input
            for(let c = 0; c < userWrite[2].length; c++) {
                if(inputChangeChar[c] === '_'){
                    inputChangeChar[c] = ' ';
                }
            }
            for(let c = 0; c < userWrite[2].length; c++) {
                NewInputChange = NewInputChange + inputChangeChar[c];
            }

            for(let c = 0; c < staffFile.staff.length; c++) {
                FileLoad = staffFile.staff[c];

                staffchange = {};
                staffchange.DiscordName = FileLoad.DiscordName;
                staffchange.InGameName = FileLoad.InGameName;
                staffchange.StaffType = FileLoad.StaffType;
                staffchange.Other = FileLoad.Other;
                staffchange.SnowflakeID = FileLoad.SnowflakeID;

                staffFile.staff[c] = staffchange;

                if((userInput[1] === 'discord') && (message.author.id === FileLoad.SnowflakeID)) {
                    ThrowError = false;
                    staffchange = {};
                    staffchange.DiscordName = NewInputChange;
                    staffchange.InGameName = FileLoad.InGameName;
                    staffchange.StaffType = FileLoad.StaffType;
                    staffchange.Other = FileLoad.Other;
                    staffchange.SnowflakeID = FileLoad.SnowflakeID;

                    staffFile.staff[c] = staffchange;

                    const embMsg = new Discord.RichEmbed()
                        .setTitle('Successful Edit!')
                        .setColor(32768)
                        .setDescription('Edited ' + FileLoad.DiscordName + ' to ' + NewInputChange + '!');
                    message.channel.send(embMsg);
                    Logging.addToLog('Success', 'Edit Staff List', message.author.username, message.author.id, message.channel.name);
                }

                if((userInput[1] === 'ign') && (message.author.id === FileLoad.SnowflakeID)) {
                    ThrowError = false;
                    staffchange = {};
                    staffchange.DiscordName = FileLoad.DiscordName;
                    staffchange.InGameName = NewInputChange;
                    staffchange.StaffType = FileLoad.StaffType;
                    staffchange.Other = FileLoad.Other;
                    staffchange.SnowflakeID = FileLoad.SnowflakeID;
    
                    staffFile.staff[c] = staffchange;

                    const embMsg = new Discord.RichEmbed()
                        .setTitle('Successful Edit!')
                        .setColor(32768)
                        .setDescription('Edited ' + FileLoad.DiscordName + ' to ' + NewInputChange + '!');
                    message.channel.send(embMsg);
                    Logging.addToLog('Success', 'Edit Staff List', message.author.username, message.author.id, message.channel.name);
                }

                if((userInput[1] === 'other') && (message.author.id === FileLoad.SnowflakeID)) {
                    ThrowError = false;
                    staffchange = {};
                    staffchange.DiscordName = FileLoad.DiscordName;
                    staffchange.InGameName = FileLoad.InGameName;
                    staffchange.StaffType = FileLoad.StaffType;
                    staffchange.Other = NewInputChange;
                    staffchange.SnowflakeID = FileLoad.SnowflakeID;
    
                    staffFile.staff[c] = staffchange;

                    const embMsg = new Discord.RichEmbed()
                        .setTitle('Successful Edit!')
                        .setColor(32768)
                        .setDescription('Edited ' + FileLoad.DiscordName + ' to ' + NewInputChange + '!');
                    message.channel.send(embMsg);
                    Logging.addToLog('Success', 'Edit Staff List', message.author.username, message.author.id, message.channel.name);
                }
            }

            if(ThrowError === true) {
                const embMsg = new Discord.RichEmbed()
                        .setTitle('Error!')
                        .setColor(0xb50000)
                        .setDescription('Unique Discord ID does not match anything in the Staff List.');
                message.channel.send(embMsg);
                Logging.addToLog('Error', 'Edit Staff List', message.author.username, message.author.id, message.channel.name);
            } else {
                rebuildStaffFile();
            }

        } else {
            const embMsg = new Discord.RichEmbed()
                    .setTitle('Invalid Selection!')
                    .setColor(0xb50000)
                    .setDescription('To edit yourself in the staff list use: !editstaff <discord / ign / other> <NEW TEXT>');
                message.channel.send(embMsg);
                Logging.addToLog('Warning', 'Edit Staff List', message.author.username, message.author.id, message.channel.name);
        }
    }
} catch (err) {
    Logging.addToLog('Fatal Error', 'Wiki', message.author.username, message.author.id, message.channel.name);
}
}

function rebuildStaffFile() {
    fs.writeFile('./data/staff.json', JSON.stringify(staffFile, null, 2), function(err) {
        if(err) {
            console.log(err);
            console.log('');
        }
        refreshStaffFile();
    });
}

function refreshStaffFile() {
    staffFile = JSON.parse(fs.readFileSync('./data/staff.json', 'utf-8'));
}

module.exports = { editStaffFile };