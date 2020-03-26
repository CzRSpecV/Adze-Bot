//#region Dependancies
var Discord = require('discord.js');
var fs = require('fs');
var pricesFile = JSON.parse(fs.readFileSync('./data/prices.json', 'utf8'));
var Logging = require('../helpers/consolelogging.js');
//#endregion

function addToPrice(message) {
    try {
    reloadPricesFile();
    var FileCheck;
    var Exists = false;
    var userInput = message.content.toLowerCase().split(' ');
    var userWrite = message.content.split(' ');

    if((userInput.length < 6) || (userInput.length > 6))  {
        const embMsg = new Discord.RichEmbed()
            .setTitle('Invalid Add!')
            .setColor(0xb50000)
            .setDescription('To add an item to the Item Database:\n !addprice <ID> <NAME> <SHORT> <TRADE COST> <SHOP COST>');
        message.channel.send(embMsg);
        Logging.addToLog('Warning', 'Add Price', message.author.username, message.author.id, message.channel.name);
    } else if (userInput.length === 6) {
        var i = pricesFile.data.length;
        var inputID = userWrite[1];
        var inputNameChar = userWrite[2].split('');
        var inputName = '';
        var inputShortcutChar = userWrite[3].split('');
        var inputShortcut = '';
        var inputTradeChar = userWrite[4].split('');
        var inputTrade = '';
        var inputStoreChar = userWrite[5].split('');
        var inputStore = '';
        
        //Name String Splicing
        for(let c = 0; c < userWrite[2].length; c++) {
            if (inputNameChar[c] === '_') {
                inputNameChar[c] = ' ';
            }
        }
        //Name String Rebuild
        for(let c = 0; c < userWrite[2].length; c++) {
            inputName = inputName + inputNameChar[c];
        }

        //Shortcut Splicing
        for(let c = 0; c < userWrite[3].length; c++) {
            if (inputShortcutChar[c] === '_') {
                inputShortcutChar[c] = ' ';
            }
        }
        //Shortcut String Rebuild
        for(let c = 0; c < userWrite[3].length; c++) {
            inputShortcut = inputShortcut + inputShortcutChar[c];
        }

        //Trade Price Splicing
        for(let c = 0; c < userWrite[4].length; c++) {
            if (inputTradeChar[c] === '_') {
                inputTradeChar[c] = ' ';
            }
        }
        //Trade Price Rebuild
        for(let c = 0; c < userWrite[4].length; c++) {
            inputTrade = inputTrade + inputTradeChar[c];
        }

        //Store Price Splicing
        for(let c = 0; c < userWrite[5].length; c++) {
            if (inputStoreChar[c] === '_') {
                inputStoreChar[c] = ' ';
            }
        }
        //Store Price Rebuild
        for(let c = 0; c < userWrite[5].length; c++) {
            inputStore = inputStore + inputStoreChar[c];
        }

        for(let i = 0; i < pricesFile.data.length; i++) {
            if(Exists === false) {
                FileCheck = pricesFile.data[i];
                if(inputID === FileCheck.itemID){
                    Exists = true;
                }
            }
        }
        if(Exists === false) {
            itemprice = {};
            if(inputID.toLowerCase() === "default") {
                itemprice.itemID = pricesFile.data.length.toString();
            } else {
                itemprice.itemID = inputID;
            }
            itemprice.itemName = inputName;
            itemprice.itemShortcut = inputShortcut;
            itemprice.itemCost = inputTrade;
            itemprice.storeCost = inputStore;
            pricesFile.data[i] = itemprice;

            buildPricesFile();

            const embMsg = new Discord.RichEmbed()
                .setTitle('Successful Add!')
                .setColor(32768)
                .setDescription('Price for: ' + inputName + ' has been successfully been added to Prices!');
            message.channel.send(embMsg);
            Logging.addToLog('Success', 'Add Price', message.author.username, message.author.id, message.channel.name);
        } else if (Exists === true) {
            const embMsg = new Discord.RichEmbed()
            .setTitle('Item Already Exists')
            .setColor(0xb50000)
            .setDescription('The item for: ' + inputName + ' already exists in the prices file.');
        message.channel.send(embMsg);
        Logging.addToLog('Warning', 'Add Price', message.author.username, message.author.id, message.channel.name);
        }
        
    }
} catch(err) {
    Logging.addToLog('Fatal Error', 'Add Price', message.author.username, message.author.id, message.channel.name);
    console.log(err);
    console.log('');
}
}

function buildPricesFile() {
    fs.writeFileSync('./data/prices.json', JSON.stringify(pricesFile, null, 2), function(err) {
        if(err) {
            console.log(err);
            console.log('');
        }
        reloadPricesFile();
    });
}

function reloadPricesFile() {
    pricesFile = JSON.parse(fs.readFileSync('./data/prices.json', 'utf8'));
}

module.exports = { addToPrice };