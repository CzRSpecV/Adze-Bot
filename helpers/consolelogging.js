//#region Dependencies
var Discord = require('discord.js');
var fs = require('fs');
var logFile = JSON.parse(fs.readFileSync('./data/consolelog.json', 'utf8'));
var botConfig  = require('../data/botconfig.json');
//#endregion

function addToLog(logtype, command, user, userid, channel) {
    try {
    reloadLogFile();
    var d = new Date();
    var id = userid.toString();
    var i = logFile.logging.length;
    console.log(logtype + ' - Command: ' + command + ' Attempted by ' + user + ' (ID: ' + id + ') in Channel: ' + channel + ' at ' + d.toDateString());
    console.log('');

    logadd = {};
    logadd.Log = logtype + ' - Command: ' + command + ' Attempted by ' + user + ' (ID: ' + id + ') in Channel: ' + channel;
    logadd.Date = d;
    logadd.Code = logtype;
    logFile.logging[i] = logadd;
    addLogInput();
    } catch (err) {
        console.log(err);
        console.log('');
    }
}

function resetLoggingFile() {
    var diddelete = false;

    if(fs.existsSync("./data/consolelog.json")) {
        buildLogFile();
        diddelete = true;
    }

    if(diddelete === true) {
        console.log('Successfuly Rebuilt the Consolelog.json\n');
    } else if(diddelete === false){
        console.log('Failed Rebuild of the ConsoleLog.json.\n');
    }
}

function reloadLogFile() {
    if(fs.existsSync("./data/consolelog.json")) {
        logFile = JSON.parse(fs.readFileSync('./data/consolelog.json', 'utf8'));
    }
}

function buildLogFile() {
    var d = new Date();
    var f = { "logging": [{
        "Log": "Rebuilt Log File",
        "Date": d,
        "Code": "None"
    }], "success": true, "status": 200 };
    fs.writeFileSync('./data/consolelog.json', JSON.stringify(f, null, 2), function(err){
        if(err) {
            console.log(err);
            console.log('');
        }
    });
}

function addLogInput() {
    fs.writeFileSync('./data/consolelog.json', JSON.stringify(logFile, null, 2), function(err){
        if(err) {
            console.log(err);
            console.log('');
        }
    });
}

function fatalErrorLogging(client) {
    console.log(logFile);
    console.log(JSON.parse(fs.readFileSync('./data/consolelog.json', 'utf8')));
    console.log(fs.readFileSync('./data/consolelog.json', 'utf8'));
    var fileCheck;
    var HardError = false;
    var listFatal = '';
    for(let c = 0; c < logFile.logging.length; c++) {
        fileCheck = logFile.logging[c];
        if(fileCheck.Code.toLowerCase() === 'fatal error') {
            listFatal = listFatal + '```Log: ' + fileCheck.Log + '\nDate: ' + fileCheck.Date + '```\n\n';
            HardError = true;
        }
    }

    var devList = botConfig.devids;
    if(HardError === true) {
        for(key in devList) {
            if(listFatal != '') {
                const embMsg = new Discord.RichEmbed()
                    .setTitle('Fatal Errors Detected!')
                    .setColor(0xb50000)
                    .setDescription(listFatal);
                client.users.get(devList[key]).send(embMsg);
            }
        }
    } else {
        HardError = false;
        listFatal = null;
    }
    reloadLogFile();
    resetLoggingFile();
}

module.exports = { addToLog, fatalErrorLogging };