var Discord = require('discord.js');
var fs = require('fs');
var pricesFile = JSON.parse(fs.readFileSync('./data/prices.json', 'utf8'));
var Logging = require('../helpers/consolelogging.js');

function devFixPrice(message) {
    try {
        reloadPricesJSON();
        var userInput = message.content.toLowerCase().split(' ');
        var inputCheckChar = userInput[2].split('');
        var inputCheck = '';
        for(let c = 0; c < userInput[2].length; c++) { if(inputCheckChar[c] === '_') { inputCheckChar[c] = ' '; } }
        for(let c = 0; c < userInput[2].length; c++) { inputCheck = inputCheck + inputCheckChar[c]; }
        var userWrite = message.content.split(' ');
        var inputChar = userWrite[3].split('');
        var inputText = '';
        for(let c = 0; c < userWrite[3].length; c++) { if(inputChar[c] === '_') { inputChar[c] = ' '; } }
        for(let c = 0; c < userWrite[3].length; c++) { inputText = inputText + inputChar[c]; }

        var FileLoad;
        var didPass = false;

        if((userInput.length > 4) || (userInput.length < 4)) {
            const embMsg = new Discord.RichEmbed()
                .setTitle('Invalid Edit!')
                .setColor(0xb50000)
                .setDescription('To edit an Item use: !devfixprice <ID / NAME / SHORTCUT / STORE> <Items ID / Items Name / Items Shortcut> <New Input>');
            message.author.send(embMsg);
            Logging.addToLog('Warning', 'Dev Edit Staff List', message.author.username, message.author.id, message.channel.name);
        } else {
            if((userInput[1] === 'id') || (userInput[1] === 'name') || (userInput[1] === 'shortcut') || (userInput[1] === 'store')) {
                for(let i = 0; i < pricesFile.data.length; i++) {
                    FileLoad = pricesFile.data[i];
                    pricesChange = {};
                    pricesChange.itemID = FileLoad.itemID;
                    pricesChange.itemName = FileLoad.itemName;
                    pricesChange.itemShortcut = FileLoad.itemShortcut;
                    pricesChange.itemCost = FileLoad.itemCost;
                    pricesChange.storeCost = FileLoad.storeCost;

                    switch(userInput[1]) {
                        case 'id':
                            if((inputCheck === FileLoad.itemID.toLowerCase()) || (inputCheck === FileLoad.itemName.toLowerCase()) || (inputCheck === FileLoad.itemShortcut.toLowerCase())) {
                                pricesChange = {};
                                pricesChange.itemID = inputText;
                                pricesChange.itemName = FileLoad.itemName;
                                pricesChange.itemShortcut = FileLoad.itemShortcut;
                                pricesChange.itemCost = FileLoad.itemCost;
                                pricesChange.storeCost = FileLoad.storeCost;
                                pricesFile.data[i] = pricesChange;
                                didPass = true;
                            }
                            break;

                        case 'name':
                            if((inputCheck === FileLoad.itemID.toLowerCase()) || (inputCheck === FileLoad.itemName.toLowerCase()) || (inputCheck === FileLoad.itemShortcut.toLowerCase())) {
                                pricesChange = {};
                                pricesChange.itemID = FileLoad.itemID;
                                pricesChange.itemName = inputText;
                                pricesChange.itemShortcut = FileLoad.itemShortcut;
                                pricesChange.itemCost = FileLoad.itemCost;
                                pricesChange.storeCost = FileLoad.storeCost;
                                pricesFile.data[i] = pricesChange;
                                didPass = true;
                            }
                            break;

                        case 'shortcut':
                            if((inputCheck === FileLoad.itemID.toLowerCase()) || (inputCheck === FileLoad.itemName.toLowerCase()) || (inputCheck === FileLoad.itemShortcut.toLowerCase())) {
                                pricesChange = {};
                                pricesChange.itemID = FileLoad.itemID;
                                pricesChange.itemName = FileLoad.itemName;
                                pricesChange.itemShortcut = inputText;
                                pricesChange.itemCost = FileLoad.itemCost;
                                pricesChange.storeCost = FileLoad.storeCost;
                                pricesFile.data[i] = pricesChange;
                                didPass = true;
                            }
                            break;

                        case 'store':
                            if((inputCheck === FileLoad.itemID.toLowerCase()) || (inputCheck === FileLoad.itemName.toLowerCase()) || (inputCheck === FileLoad.itemShortcut.toLowerCase())) {
                                pricesChange = {};
                                pricesChange.itemID = FileLoad.itemID;
                                pricesChange.itemName = FileLoad.itemName;
                                pricesChange.itemShortcut = FileLoad.itemShortcut;
                                pricesChange.itemCost = FileLoad.itemCost;
                                pricesChange.storeCost = inputText;
                                pricesFile.data[i] = pricesChange;
                                didPass = true;
                            }
                            break;

                        default:
                            pricesFile.data[i] = pricesChange;
                    }
                }
                if(didPass === true) {
                    const embMsg = new Discord.RichEmbed()
                        .setTitle('Successful Edit!')
                        .setColor(32768)
                        .setDescription('Successfully edited Item '+ userWrite[2] + ' into ' + userWrite[3]);
                    message.author.send(embMsg);
                    Logging.addToLog('Success', 'Dev Edit Prices', message.author.username, message.author.id, message.channel.name);
                    message.delete().catch(O_o=>{});
                    buildPricesFile();
                } else if(didPass === false) {
                    const embMsg = new Discord.RichEmbed()
                        .setTitle('Failed Edit!')
                        .setColor(0xb50000)
                        .setDescription('Failed to edit Item '+ userWrite[2] + ' into ' + userWrite[3]);
                    message.author.send(embMsg);
                    Logging.addToLog('Warning', 'Dev Edit Prices', message.author.username, message.author.id, message.channel.name);
                    message.delete().catch(O_o=>{});
                }
            }
        }
    } catch (err) { console.log(err); console.log(''); }
}

function reloadPricesJSON() {
    pricesFile = JSON.parse(fs.readFileSync('./data/prices.json', 'utf8'));
}

function buildPricesFile() {
    fs.writeFileSync('./data/prices.json', JSON.stringify(pricesFile, null, 2), function(err) {
        if(err) {
            console.log(err);
            console.log('');
        }
        reloadPricesJSON();
    })
}

module.exports = { devFixPrice };