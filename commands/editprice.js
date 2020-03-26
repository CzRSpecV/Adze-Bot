//#region Dependancies
var Discord = require('discord.js');
var fs = require('fs');
var pricesFile = JSON.parse(fs.readFileSync('./data/prices.json', 'utf8'));
var Logging = require('../helpers/consolelogging.js');
//#endregion

function editPriceFile(message) {
    try {
    reloadPricesFile();
    var userInput = message.content.toLowerCase().split(' ');
    var userWrite = message.content.split(' ');
    var BreakLoop = false;
    var ErrorLoop = true;

    if((userInput.length < 3) || (userInput.length > 3)) {
        const embMsg = new Discord.RichEmbed()
            .setTitle('Invalid Edit!')
            .setColor(0xb50000)
            .setDescription('To edit a price in the Price Database use the following:\n !editprice <ID / NAME / SHORT> <NEWTRADEPRICE>');
        message.channel.send(embMsg);
        Logging.addToLog('Warning', 'Edit Price', message.author.username, message.author.id, message.channel.name);
    } else {
        var PulledName;
        var inputMatchChar = userInput[1].split('');
        var inputMatch = '';
        var inputNewPriceChar = userWrite[2].split('');
        var inputNewPrice = '';
        
        //Trade Price Splicing
        for(let c = 0; c < userInput[1].length; c++) {
            if (inputMatchChar[c] === '_') {
                inputMatchChar[c] = ' ';
            }
        }
        //Trade Price Rebuild
        for(let c = 0; c < userWrite[1].length; c++) {
            inputMatch = inputMatch + inputMatchChar[c];
        }

        //Trade Price Splicing
        for(let c = 0; c < userWrite[2].length; c++) {
            if (inputNewPriceChar[c] === '_') {
                inputNewPriceChar[c] = ' ';
            }
        }
        //Trade Price Rebuild
        for(let c = 0; c < userWrite[2].length; c++) {
            inputNewPrice = inputNewPrice + inputNewPriceChar[c];
        }

        for(let c = 0; c < pricesFile.data.length; c++) {
            PulledName = pricesFile.data[c];
            itemprice = {};
            itemprice.itemID = PulledName.itemID;
            itemprice.itemName = PulledName.itemName;
            itemprice.itemShortcut = PulledName.itemShortcut;
            itemprice.itemCost = PulledName.itemCost;
            itemprice.storeCost = PulledName.storeCost;

            pricesFile.data[c] = itemprice;

            if((PulledName.itemID.toLowerCase() === inputMatch) || (PulledName.itemName.toLowerCase() === inputMatch) || (PulledName.itemShortcut.toLowerCase() === inputMatch) && (BreakLoop != true)) {
                BreakLoop = true;
                ErrorLoop = false;

                itemprice = {};
                itemprice.itemID = PulledName.itemID;
                itemprice.itemName = PulledName.itemName;
                itemprice.itemShortcut = PulledName.itemShortcut;
                itemprice.itemCost = inputNewPrice;
                itemprice.storeCost = PulledName.storeCost;

                pricesFile.data[c] = itemprice;

                const embMsg = new Discord.RichEmbed()
                    .setTitle('Successful Edit!')
                    .setColor(32768)
                    .setDescription('Item ' + PulledName.itemName + ' has been changed from ' + PulledName.itemCost + ' to ' + inputNewPrice +'!');
                message.channel.send(embMsg);
                Logging.addToLog('Success', 'Edit Price', message.author.username, message.author.id, message.channel.name);
            }
        }

        editPriceBuild();

        if(ErrorLoop === true){
            const embMsg = new Discord.RichEmbed()
                .setTitle('Error!')
                .setColor(0xb50000)
                .setDescription('The item you are attempting to edit: ' + inputMatch + ' seems to not be in the database. Please try again or use !pc listall to see all items in the Database!');
            message.channel.send(embMsg);
        }
    }
} catch(err) {
    Logging.addToLog('Fatal Error', 'Wiki', message.author.username, message.author.id, message.channel.name);
}
}

function editPriceBuild() {
    fs.writeFile('./data/prices.json', JSON.stringify(pricesFile, null, 2), function(err) {
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

module.exports = { editPriceFile };