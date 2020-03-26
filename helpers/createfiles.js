//#region Dependancies
var fs = require('fs');
//#endregion

//#region Creates missing files on start
function createJSONfiles() {

    var d = new Date();
    var emptyfile = {};
    var emptyLogFile = { "logging": [{
        "Log": "Initial Log Create",
        "Date": d,
        "Code": "None"
    }], "success": true, "status": 200 };
    var emptyLead = { "users": [{
        "Username" : "CzRSpecV#1805",
        "ID": "134900859560656896",
        "Count": "0"
    }], "success": true, "status": 200};
    var emptyMarket = { "134900859560656896": [{
        "itemName": "",
        "itemCost": "",
        "numToSell": ""
    }]};

    if (!fs.existsSync("./data/botprefix.json")) {
        fs.writeFileSync("./data/botprefix.json", JSON.stringify(emptyfile), function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
    
    if (!fs.existsSync("./data/serverconfig.json")) {
        fs.writeFileSync("./data/serverconfig.json", JSON.stringify(emptyfile), function(err) {
            if (err) {
                console.log(err);
            }
        });
    }

    if(!fs.existsSync("./data/consolelog.json")) {
        fs.writeFileSync("./data/consolelog.json", JSON.stringify(emptyLogFile, null, 2), function(err) {
            if (err) {
                console.log(err);
            }
        });
    }

    if(!fs.existsSync("./data/userleaderboard.json")) {
        fs.writeFileSync("./data/userleaderboard.json", JSON.stringify(emptyLead, null, 2), function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
    if(!fs.existsSync("./data/marketlist.json")) {
        fs.writeFileSync("./data/marketlist.json", JSON.stringify(emptyMarket, null, 2), function(err) {
            if (err) {
                console.log(err);
            }
        });
    }

}
//#endregion

//#region exports
module.exports = { createJSONfiles };
//#endregion