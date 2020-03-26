var Discord = require('discord.js');
var fs = require('fs');
var marketFile = JSON.parse(fs.readFileSync('./data/marketlist.json', 'utf8'));
var Logging = require('../helpers/consolelogging.js');

function addToMarket(message) {
    try{
    rebuildMarketJSON();
    var FileLoad;
    var userInput = message.content.toLowerCase().split(' ');
    var userWrite = message.content.split(' ');
    var userID = message.author.id.toString();

    var iNameChar = userWrite[1].split('');
    var iName = '';
    for(let c = 0; c < userWrite[1].length; c++) { if(iNameChar[c] === '_') { iNameChar[c] = ' '; } }
    for(let c = 0; c < userWrite[1].length; c++) { iName = iName + iNameChar[c]; }

    if((userInput.length < 4) || (userInput.length > 4)) {
        const embMsg = new Discord.RichEmbed()
            .setTitle('Invalid Add!')
            .setColor(0xb50000)
            .setDescription('To add an item to your market listings:\n !addmarket <Item Name> <Item Cost> <Quantity> (Note: Spaces in Item Names should be replaced with _\'s)');
        message.channel.send(embMsg);
        Logging.addToLog('Warning', 'Add Market', message.author.username, message.author.id, message.channel.name);
    } else {
        if(marketFile[userID] != undefined) {
            fileInput = {};
            fileInput.itemName = iName;
            fileInput.itemCost = userWrite[2].toString() + " PKT";
            fileInput.numToSell = userWrite[3];
            marketFile[userID][marketFile[userID].length] = fileInput;

            const embMsg = new Discord.RichEmbed()
                .setTitle('Successful Add!')
                .setColor(32768)
                .setDescription('Added a Market Listing for: ' + iName + ' into + ' + message.author.username + '\s listings!');
            message.channel.send(embMsg);
            Logging.addToLog('Success', 'Add Price', message.author.username, message.author.id, message.channel.name);
        } else if (marketFile[userID] === undefined) {
            fileInput = {};
            fileInput.itemName = iName;
            fileInput.itemCost = userWrite[2].toString() + " PKT";
            fileInput.numToSell = userWrite[3];
            marketFile[userID] = [];
            marketFile[userID][marketFile[userID].length] = fileInput;
            const embMsg = new Discord.RichEmbed()
                .setTitle('Successful Add!')
                .setColor(32768)
                .setDescription('Added a Market Listing for: ' + iName + ' into + ' + message.author.username + '\s listings!');
            message.channel.send(embMsg);
        }
        reloadMarketJSON();
    }
} catch (err) { Logging.addToLog('Fatal Error', 'Add Price', message.author.username, message.author.id, message.channel.name); }
}

function editMarket(message) {
    rebuildMarketJSON();
}

function removeFromMarket(message) {
    rebuildMarketJSON();
}

function reloadMarketJSON() {
    fs.writeFileSync('./data/marketlist.json', JSON.stringify(marketFile, null, 2), function(err) {
        if(err) {
            console.log(err);
            console.log('');
        }
        rebuildMarketJSON();
    });
}

function rebuildMarketJSON() {
    marketFile = JSON.parse(fs.readFileSync('./data/marketlist.json', 'utf8'));
}

module.exports = { addToMarket, editMarket, removeFromMarket };