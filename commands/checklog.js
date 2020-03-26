var Discord = require('discord.js');
var fs = require('fs');
var logFile = JSON.parse(fs.readFileSync('./data/consolelog.json', 'utf8'));

function viewConsoleLog(message) {
    reloadConsoleLog();
    var f;
    var msgList = '';
    for(let i = 0; i < logFile.logging.length; i++) {
        f = logFile.logging[i];
        msgList = msgList + '```Log: ' + f.Log + '\nDate: ' + f.Date + '```\n';
    }
    if(msgList.length >= 2048) {
        const embMsg = new Discord.RichEmbed()
            .setTitle('Warning - File Size')
            .setColor(32768)
            .setDescription('The Log File is currently too large to process.');
        message.author.send(embMsg);
        message.delete().catch(O_o=>{});
    } else if(msgList.length < 2048) {
        const embMsg = new Discord.RichEmbed()
            .setTitle('Console Log File')
            .setColor(32768)
            .setDescription(msgList);
        message.author.send(embMsg);
        message.delete().catch(O_o=>{});
    }
}

function reloadConsoleLog() {
    logFile = JSON.parse(fs.readFileSync('./data/consolelog.json', 'utf8'));
}

module.exports = { viewConsoleLog };