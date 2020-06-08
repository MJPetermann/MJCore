var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var url = fs.readFileSync("./url", 'utf8');
module.exports = (guildId) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        let name = guildId + ".id"; 
        let value = guildId;
        let query = {};
        query[name] = value;
        
        dbo.collection("servers").findOne(query, (err, result)=>{
        var updatedData = 
        {
            $set:
            {
                [guildId]: 
                {
                  "id": guildId,
                  "prefix":result[guildId]["prefix"],
                  "version":"0.4",
                  "setupStage": result[guildId]["setupStage"],
                  "ControlChannels":
                  {
                    "TemporaryChannelIds":result[guildId]["ControlChannels"]["TemporaryChannelIds"],
                    "TemporaryCategoryIds":result[guildId]["ControlChannels"]["TemporaryCategoryIds"],
                    "PrivatTextChannelId":result[guildId]["ControlChannels"]["PrivatTextChannelId"],
                    "AvailableNums":result[guildId]["ControlChannels"]["AvailableNums"]
                  },
                  "TemporaryChannels":
                  result[guildId]["TemporaryChannels"],
                  "PrivatChannels":
                  result[guildId]["PrivatChannels"],
                  "authorisedMemberIds":
                  result[guildId]["authorisedMemberIds"]
                }
              }
        }
        dbo.collection("servers").update(query, updatedData);
        db.close();  
        });
    });
}