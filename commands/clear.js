var Discord = require('discord.js');
var Logging = require('../helpers/consolelogging.js');

function clearMessages(message) {
    var userInput = message.content.toLowerCase().split(' ');
    var amount = parseInt(userInput[1]);
    var passed = true;

    if(isNaN(amount)) {
        const embMsg = new Discord.RichEmbed()
            .setTitle('Error!')
            .setColor(0xb50000)
            .setDescription('That is not a valid number for the ' + prefix + 'clear command!');
        message.channel.send(embMsg);
        Logging.addToLog('Warning', 'Clear', message.author.username, message.author.id, message.channel.name);
        passed = false;
    } else if(amount < 1 || amount > 99) {
        const embMsg = new Discord.RichEmbed()
            .setTitle('Error!')
            .setColor(0xb50000)
            .setDescription(userInput[1] + ' is invalid! Number must be between 1 and 99!');
        message.channel.send(embMsg);
        Logging.addToLog('Warning', 'Clear', message.author.username, message.author.id, message.channel.name);
        passed = false;
    }

    if(amount >= 1 && amount <= 99) {
        message.channel.bulkDelete((amount + 1), true).catch(err => {
            console.error(err);
            const embMsg = new Discord.RichEmbed()
                .setTitle('Error!')
                .setColor(0xb50000)
                .setDescription('An error occurred while attempting to delete!');
            message.channel.send(embMsg);
            Logging.addToLog('Error', 'Clear', message.author.username, message.author.id, message.channel.name);
            passed = false;
        });
        if(passed == true) {
            const embMsg = new Discord.RichEmbed()
                .setTitle('Success!')
                .setColor(32768)
                .setDescription('As Per ' + message.author.tag + ', successfully deleted ' + amount + ' messages!');
            message.channel.send(embMsg);
            Logging.addToLog('Success', 'Clear', message.author.username, message.author.id, message.channel.name);
        }
    }
}

module.exports = { clearMessages };