var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var url = fs.readFileSync("./url", 'utf8');
module.exports = (guildId, typ) => {
    return new Promise(resolve => {
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("mydb");
          let name = guildId + ".id"; 
          let value = guildId;
          let query = {};
          query[name] = value;
          dbo.collection("servers").findOne(query, (err, result)=>{
            var returnArray = [];
            if(typ == "allS" || typ == null || typ == undefined) 
            {
              resolve(result[guildId]);
            }else if(typ == "allE")
            {
              resolve(result);
            }else
            {
            if(typ.indexOf("prfx") > -1) {returnArray.push(result[guildId]["prefix"]);}
            if(typ.indexOf("auth") > -1) returnArray.push(result[guildId]["authorisedMemberIds"][0]);
            if(typ.indexOf("sets") > -1) returnArray.push(result[guildId]["setupStage"]);
            if(typ.indexOf("ctrl") > -1) returnArray.push(result[guildId]["ControlChannels"]);
            if(typ.indexOf("tmpC") > -1) returnArray.push(result[guildId]["TemporaryChannels"]);
            if(typ.indexOf("pvtC") > -1) returnArray.push(result[guildId]["PrivatChannels"]);
            resolve(returnArray);
            }
          });
          db.close();
        });
    }); 
}