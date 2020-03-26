var Discord = require('discord.js');
var Logging = require('../helpers/consolelogging.js');

function wikiMessage(message) {
    try {
    var userInput = message.content.toLowerCase().split(' ');
    var ToSearch = '';
    var RandomSearch = false;
    var SpecialSearch = false;
    var ThrowError = true;

    if(userInput.length === 1) {
        message.channel.send('You attempted to search a blank wiki search! Please add something to search after !wiki');
        Logging.addToLog('Warning', 'Wiki', message.author.username, message.author.id, message.channel.name);
    } else {
        for(let i = 1; i < userInput.length; i++) {
            if (i == userInput.length - 1) {
                ToSearch = ToSearch + userInput[i];
            }
            else if (i < userInput.length) {
                ToSearch = ToSearch + userInput[i] + "+";
            }
            ThrowError = false;
        }
    }

    if(ToSearch === 'random') {
        RandomSearch = true
    }

    if((SpecialSearch != true) && (RandomSearch != true) && (ThrowError != true)) {
        message.channel.send('Your wiki search for "' + message.content + '": https://pylospk.fandom.com/wiki/Special:Search?query=' + ToSearch);
        Logging.addToLog('Success', 'Wiki', message.author.username, message.author.id, message.channel.name);
    } else if((RandomSearch === true) && (SpecialSearch === false) & (ThrowError != true)) {
        message.channel.send('Here, have a random Wiki Link: https://pylospk.fandom.com/wiki/Special:Random');
        Logging.addToLog('Success', 'Wiki', message.author.username, message.author.id, message.channel.name);
    }
} catch (err) {
    Logging.addToLog('Fatal Error', 'Wiki', message.author.username, message.author.id, message.channel.name);
}
}
module.exports = { wikiMessage };