//#regions dependancies
var fs = require('fs');
var bconfig = require('../data/botconfig.json');
//#endregion

//#region bugReport
function bugReport(client, message, content) {
    var devlist = bconfig.devids;

    for (key in devlist) {
        client.users.get(devlist[key]).send('```***BUG REPORT***``` ```\n' + content + '\n ````From - ' + message.author.tag + '`');
    }
    message.channel.send('```Bug Report Recieved.```');
}
//#endregion

//#region export
module.exports = { bugReport };
//#endregion