var Discord = require('discord.js');
var fs = require('fs');

function resetLogfile(message) {
    var d = new Date();
    var f = { "logging": [{
        "Log": "Rebuilt File Requested By: " + message.author.username,
        "Date": d,
        "Code": "None"
    }], "success": true, "status": 200 };
    var diddelete = false;

    if(fs.existsSync("./data/consolelog.json")) {
        fs.unlinkSync("./data/consolelog.json", function(err) {
            if(err) { console.log(err); }
        });
        const embMsg = new Discord.RichEmbed()
                .setTitle('Successful Log Delete!')
                .setColor(32768)
                .setDescription('Logging File has been Successfully Deleted!');
        message.author.send(embMsg);
        diddelete = true;
    }

    if(diddelete === true) {
        fs.writeFileSync("./data/consolelog.json", JSON.stringify(f, null, 2), function(err) {
            if (err) {
                console.log(err);
            }
        });
        const embMsg = new Discord.RichEmbed()
                .setTitle('Successful Rebuild!')
                .setColor(32768)
                .setDescription('Logging File Successfully Rebuilt!');
        message.author.send(embMsg);
        message.delete().catch(O_o=>{});
    } else if(diddelete === false){
        const embMsg = new Discord.RichEmbed()
                .setTitle('Failed Rebuild!')
                .setColor(0xb50000)
                .setDescription('Logging File has failed to be Rebuilt!');
        message.author.send(embMsg);
        message.delete().catch(O_o=>{});
    }
}

module.exports = { resetLogfile };