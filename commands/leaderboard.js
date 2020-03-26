var Discord = require('discord.js');
var fs = require('fs');
var leaderboardFile = JSON.parse(fs.readFileSync('./data/userleaderboard.json', 'utf8'));
var Logging = require('../helpers/consolelogging.js');

function viewLeaderboard(message) {
    try {
    loadJSON();
    var AdzeID = 649123729800167456;
    var cVar = [];
    var checkFile;
    var counter = 0;
    var top5Name = ['', '', '', '', ''];
    var top5Count = [0, 0, 0, 0, 0];
    var sendmsg = '';
    var tie1 = false;
    var tie2 = false;
    var tie3 = false;
    var tie4 = false;
    var tie5 = false;

    for(let i = 0; i < leaderboardFile.users.length; i++) {
        checkFile = leaderboardFile.users[i];
        cVar[i] = Number(checkFile.Count);
        cVar.sort(function(a, b) {return b-a});
    }

    for(let i = 0; i < leaderboardFile.users.length; i++) {
        checkFile = leaderboardFile.users[i];
        counter = Number(checkFile.Count);

        if(checkFile.ID != AdzeID) {
            if(counter === cVar[0]) {
                if(tie1 != true) {
                top5Name[0] = checkFile.Username;
                top5Count[0] = counter;
                tie1 = true;
                } else if (tie1 === true) {
                    top5Name[0] = top5Name + ' / ' + checkFile.Username;
                    top5Count[0] = counter;
                }
            }
            if(counter === cVar[1]) {
                if(tie2 != true) {
                    top5Name[1] = checkFile.Username;
                    top5Count[1] = counter;
                    tie2 = true;
                    } else if (tie2 === true) {
                        top5Name[1] = top5Name + ' / ' + checkFile.Username;
                        top5Count[1] = counter;
                    }
            }
            if(counter === cVar[2]) {
                if(tie3 != true) {
                    top5Name[2] = checkFile.Username;
                    top5Count[2] = counter;
                    tie3 = true;
                    } else if (tie3 === true) {
                        top5Name[2] = top5Name + ' / ' + checkFile.Username;
                        top5Count[2] = counter;
                    }
            }
            if(counter === cVar[3]) {
                if(tie4 != true) {
                    top5Name[3] = checkFile.Username;
                    top5Count[3] = counter;
                    tie4 = true;
                    } else if (tie4 === true) {
                        top5Name[3] = top5Name + ' / ' + checkFile.Username;
                        top5Count[3] = counter;
                    }
            }
            if(counter === cVar[4]) {
                if(tie5 != true) {
                    top5Name[4] = checkFile.Username;
                    top5Count[4] = counter;
                    tie5 = true;
                    } else if (tie5 === true) {
                        top5Name[4] = top5Name + ' / ' + checkFile.Username;
                        top5Count[4] = counter;
                    }
            }
        }
    }
    
    for(let c = 0; c < 5; c++) {
        if(top5Name[c] === '') { top5Name[c] = 'None'; }
    }

    sendmsg = '**Top Five Users - Does Not Include Commands**\n\n ```1: ' + top5Name[0] + ' - Messages: ' + top5Count[0] + 
            '```\n```2: ' + top5Name[1] + ' - Messages: ' + top5Count[1] + 
            '```\n```3: ' + top5Name[2] + ' - Messages: ' + top5Count[2] + 
            '```\n```4: ' + top5Name[3] + ' - Messages: ' + top5Count[3] + 
            '```\n```5: ' + top5Name[4] + ' - Messages: ' + top5Count[4] + '```';
    const embMsg = new Discord.RichEmbed()
            .setTitle('Discord Leaderboards')
            .setColor(32768)
            .setDescription(sendmsg);
    message.channel.send(embMsg);
    Logging.addToLog('Success', 'Leaderboard', message.author.username, message.author.id, message.channel.name);
} catch (err) { Logging.addToLog('Fatal Error', 'Leaderboard', message.author.username, message.author.id, message.channel.name); }
}

function loadJSON() {
    leaderboardFile = JSON.parse(fs.readFileSync('./data/userleaderboard.json', 'utf8'));
}

module.exports = { viewLeaderboard };