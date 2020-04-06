var Discord = require('discord.js');
var fs = require('fs');
var math = require('../helpers/math.js');
var pricesFile = JSON.parse(fs.readFileSync('./data/prices.json', 'utf8'));
var Logging = require('../helpers/consolelogging.js');

function priceMessage(message) {
    try {
    reloadPricesFile();
    var userInput = message.content.toLowerCase().split(' ');
    var userNormal = message.content.split(' ');
    var ToSearch = '';
    var RandomSearch = false;
    var FullNameList = false;
    var throwError = true;
    var SearchError = true;
    var BreakLoop = false;
    var inputError = false;
    var CheckFile;
    var FullItemName;
    var ShortcutName;
    var ItemIDNumber;
    var ItemTradeCost;
    var ItemShopCost;
    var FullListString = '';

    if(userInput.length === 1) {
        const embMsg = new Discord.RichEmbed()
            .setTitle('Error!')
            .setColor(0xb50000)
            .setDescription('You attempted to search a blank item! Please use the following:\n !pc <ITEM ID / NAME / SHORT NAME>');
        message.channel.send(embMsg);
        Logging.addToLog('Warning', 'Check Price', message.author.username, message.author.id, message.channel.name);
        inputError = true;
    } else {
        for(let i = 1; i < userInput.length; i++) {
            if (i == userInput.length - 1) {
                ToSearch = ToSearch + userInput[i];
                throwError = false;
            }
            else if (i < userInput.length) {
                ToSearch = ToSearch + userInput[i] + " ";
                throwError = false;
            }
        }
    }

    if(ToSearch === 'random') {
        RandomSearch = true
    }

    if(ToSearch === 'listall') {
        FullNameList = true
    }

    if((throwError != true) && (RandomSearch != true) && (FullNameList != true)) {
        for(let i = 0; i < pricesFile.data.length; i++) {
            if(BreakLoop != true) {
                CheckFile = pricesFile.data[i];
            }
                if(((CheckFile.itemName.toLowerCase() === ToSearch) || (CheckFile.itemShortcut.toLowerCase() === ToSearch) || (CheckFile.itemID === ToSearch)) && BreakLoop != true) {
                    SearchError = false;
                    ItemIDNumber = CheckFile.itemID;
                    FullItemName = CheckFile.itemName;
                    ShortcutName = CheckFile.itemShortcut;
                    ItemTradeCost = CheckFile.itemCost;
                    ItemShopCost = CheckFile.storeCost;
                    BreakLoop = true;
            }
        }
    }

    if((RandomSearch === true) && (BreakLoop != true) && (FullNameList != true)) {
        CheckFile = pricesFile.data[math.getRandomInt(pricesFile.data.length - 1)];
        SearchError = false;
        ItemIDNumber = CheckFile.itemID;
        FullItemName = CheckFile.itemName;
        ShortcutName = CheckFile.itemShortcut;
        ItemTradeCost = CheckFile.itemCost;
        ItemShopCost = CheckFile.storeCost;
        BreakLoop = true;
    }

    if((FullNameList === true) && (BreakLoop != true) && (RandomSearch != true)) {
        for(let i = 0; i < pricesFile.data.length; i++) {
            CheckFile = pricesFile.data[i];
            FullListString = FullListString + CheckFile.itemName + ' ( ' + CheckFile.itemShortcut + ' )' + '\n';
        }
    }

    if((BreakLoop != true) && (FullNameList != true) && (inputError != true)) {
        const embMsg = new Discord.RichEmbed()
            .setTitle('Sorry!')
            .setColor(0xb50000)
            .setDescription('The item you attempted to search: ' + ToSearch + ' is not currently in the database!\nIf you believe it should be, contact an Admin.');
        message.channel.send(embMsg);
    }
    if((SearchError === false) && (FullNameList != true)) {
        var sendmsg = "```Item Name: " + FullItemName + "\nCommon Name: " + ShortcutName + "\nPlayer Trade Price: " + ItemTradeCost + "\nShop Cost: " + ItemShopCost + "```";
        const embMsg = new Discord.RichEmbed()
            .setTitle(FullItemName)
            .setColor(32768)
            .setDescription(sendmsg);
        message.channel.send(embMsg);
        Logging.addToLog('Success', 'Check Price', message.author.username, message.author.id, message.channel.name);
    }
    if(FullNameList === true) {
        const embMsg = new Discord.RichEmbed()
            .setTitle('Price Database')
            .setColor(32768)
            .setDescription(FullListString);
        message.channel.send(embMsg);
        Logging.addToLog('Success', 'Check Price', message.author.username, message.author.id, message.channel.name);
    }
} catch (err) {
    Logging.addToLog('Fatal Error', 'Price Check', message.author.username, message.author.id, message.channel.name);
}
}

function reloadPricesFile() {
    pricesFile = JSON.parse(fs.readFileSync('./data/prices.json', 'utf8'));
}

module.exports = { priceMessage };