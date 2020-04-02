var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var url = fs.readFileSync('D:/GitHub/mjcore/MJCore/url', 'utf8');
module.exports = (guildId, ownerId) =>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var STDConstruct = 
        [
          {
            [guildId]: 
            {
              "id": guildId,
              "prefix":"!",
              "ControlChannels": 
              {
                "TemporaryChannelId1":"",
                "TemporaryChannelId2":"",
                "TemporaryChannelId3":"",
                "TemporaryCategoryId1":"",
                "TemporaryCategoryId2":"",
                "TemporaryCategoryId3":"",
                "PrivatTextChannelId":""
              },
              "TemporaryChannels":
              [
    
              ],
              "PrivatChannels":
              [
    
              ],
              "authorisedMemberIds":
              [
                ownerId
              ]
            }
          }
        ];
        dbo.collection("servers").insertMany(STDConstruct);
        db.close();
      });
};