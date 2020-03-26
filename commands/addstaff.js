var Discord = require('discord.js');
var fs = require('fs');
var Logging = require('../helpers/consolelogging.js');
var staffFile = JSON.parse(fs.readFileSync('./data/staff.json', 'utf-8'));

function addToStaff(message) {
    refreshStaffFile();
    try {
        var userInput = message.content.toLowerCase().split(' ');
        var userWrite = message.content.split(' ');

        if ((userInput.length < 6) || (userInput.length > 6)) {
            const embMsg = new Discord.RichEmbed()
                .setTitle('Invalid Add!')
                .setColor(0xb50000)
                .setDescription('To add a Staff Member to the Database:\n !addstaff <DISCORDNAME> <IGN> <STAFFTYPE> <OTHER> <SNOWFLAKE>');
            message.channel.send(embMsg);
            Logging.addToLog('Warning', 'Add Staff', message.author.username, message.author.id, message.channel.name);
        } else if(userInput.length === 6) {
            var i = staffFile.staff.length;
            var DiscordNameChar = userWrite[1].split('');
            var DiscordNameInput = '';
            var IGNChar = userWrite[2].split('');
            var IGNInput = '';
            var StaffTypeChar = userWrite[3].split('');
            var StaffTypeInput = '';
            var OtherChar = userWrite[4].split('');
            var OtherInput = '';
            var SnowflakeIDInput = userWrite[5];

            //Splicing and Rebuilds
            for(let c = 0; c < userWrite[1].length; c++) { if(DiscordNameChar[c] === '_') { DiscordNameChar[c] = ' '; } }
            for(let c = 0; c < userWrite[1].length; c++) { DiscordNameInput = DiscordNameInput + DiscordNameChar[c]; }

            for(let c = 0; c < userWrite[2].length; c++) { if(IGNChar[c] === '_') { IGNChar[c] = ' '; } }
            for(let c = 0; c < userWrite[2].length; c++) { IGNInput = IGNInput + IGNChar[c]; }

            for(let c = 0; c < userWrite[3].length; c++) { if(StaffTypeChar[c] === '_') { StaffTypeChar[c] = ' '; } }
            for(let c = 0; c < userWrite[3].length; c++) { StaffTypeInput = StaffTypeInput + StaffTypeChar[c]; }

            for(let c = 0; c < userWrite[4].length; c++) { if(OtherChar[c] === '_') { OtherChar[c] = ' '; } }
            for(let c = 0; c < userWrite[4].length; c++) { OtherInput = OtherInput + OtherChar[c]; }

            addstaff = {};
            addstaff.DiscordName = DiscordNameInput;
            addstaff.InGameName = IGNInput;
            addstaff.StaffType = StaffTypeInput;
            addstaff.Other = OtherInput;
            addstaff.SnowflakeID = SnowflakeIDInput;

            staffFile.staff[i] = addstaff;

            const embMsg = new Discord.RichEmbed()
                    .setTitle('Successful Add!')
                    .setColor(32768)
                    .setDescription('Added ' + DiscordNameInput + ' to the Staff Team!');
            message.channel.send(embMsg);
            Logging.addToLog('Success', 'Add Staff List', message.author.username, message.author.id, message.channel.name);
            message.delete().catch(O_o=>{});

            buildStaffFile();
        }
    } catch(err) {
        Logging.addToLog('Fatal Error', 'Wiki', message.author.username, message.author.id, message.channel.name);
    }
}

function buildStaffFile() {
    fs.writeFileSync('./data/staff.json', JSON.stringify(staffFile, null, 2), function (err) {
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

module.exports = { addToStaff };