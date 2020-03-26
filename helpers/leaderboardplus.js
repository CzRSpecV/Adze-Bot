var Discord = require('discord.js');
var fs = require('fs');
var leaderboardFile = JSON.parse(fs.readFileSync('./data/userleaderboard.json', 'utf8'));
var Logging = require('../helpers/consolelogging.js');

function addToLeaderboard(message) {
    try {
    reloadFile();
    var checkFile;
    var UserExists = false;
    var curCount;

    for(let i = 0; i < leaderboardFile.users.length; i++) {
        checkFile = leaderboardFile.users[i];
        curCount = Number(checkFile.Count);
        curCount = curCount + 1;
        
        toAdd = {};
        toAdd.Username = checkFile.Username;
        toAdd.ID = checkFile.ID;
        toAdd.Count = checkFile.Count;
        leaderboardFile.users[i] = toAdd;

        if(Number(checkFile.ID) === Number(message.author.id)) {
            toAdd = {};
            toAdd.Username = checkFile.Username;
            toAdd.ID = checkFile.ID;
            toAdd.Count = curCount.toString();
            leaderboardFile.users[i] = toAdd;
            UserExists = true;
        }
    }

    if (UserExists === false) {
        toAdd = {};
        toAdd.Username = message.author.username;
        toAdd.ID = message.author.id;
        toAdd.Count = "1";
        leaderboardFile.users[leaderboardFile.users.length] = toAdd;
        Logging.addToLog('New User', 'Leaderboard', message.author.username, message.author.id, message.channel.name);
    }
    buildFile();
} catch (err) { Logging.addToLog('Fatal Error', 'Add Leaderboard', message.author.username, message.author.id, message.channel.name); }
}

function reloadFile() {
    leaderboardFile = JSON.parse(fs.readFileSync('./data/userleaderboard.json', 'utf8'));
}

function buildFile() {
    fs.writeFile('./data/userleaderboard.json', JSON.stringify(leaderboardFile, null, 2), function(err) {
        if(err) {
            console.log(err);
            console.log('');
        }
        reloadFile();
    });
}

module.exports = { addToLeaderboard };