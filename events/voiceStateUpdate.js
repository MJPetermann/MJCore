var MongoClient = require("mongodb").MongoClient;
var fs = require("fs");
var url = fs.readFileSync("./url", "utf8");
var getData = require("./../MJModules/getData.js");
module.exports = async (client, beforeData, afterData) => {
  var data = await getData(afterData.guild.id, "ctrl-tmpC");

  await data[0]["TemporaryChannelIds"].forEach((value, index, arr) => {
    if (afterData["channelID"] == value)
      createNjoinChannel(client, value, afterData, data);
  });
  checkChannels(afterData, data[1], data[0]["AvailableNums"]);
};

//  functions


function createNjoinChannel(client, channelID, afterData, data) {
  //  creates a new voicechannel, if a user joins a pre-defined voicechannel

  client.channels.fetch(channelID).then(async (channel) => {
    let number = await getName(afterData.guild.id, data[0]["AvailableNums"]);
    let ctrCL = await data[0]["TemporaryChannelIds"].indexOf(channelID);
    let categoryID = await data[0]["TemporaryCategoryIds"][ctrCL];
    
    console.log('Channel created: "temp #' + number + '"');

    channel
      .clone({
        name: "temp #" + [number],
      })
      .then(async (clonedC) => {
        clonedC.setParent(categoryID);
        
        var theMember = await afterData.guild.members.fetch(afterData.id);
        theMember.voice.setChannel(clonedC);

        MongoClient.connect(url, function (err, db) {
          if (err) throw err;
          
          var guildId = afterData.guild.id;
          let clonedCID = clonedC.id;
          var dbo = db.db("mydb");
          let name = guildId + ".id";
          let value = guildId;
          let query = {};
          query[name] = value;
          let Tstring = guildId + ".TemporaryChannels";
          let updatedData = {
            $push: {
              [Tstring]: clonedCID,
            },
          };
          
          dbo.collection("servers").updateOne(query, updatedData);
          db.close();
        });
      });
  });
}


function getName(guildId, AvNums) {
  return new Promise((resolve) => {
    var bestNum = parseInt(Math.min(...AvNums), 10);
    
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
    
      var dbo = db.db("mydb");
      let name = guildId + ".id";
      let value = guildId;
      let query = {};
      query[name] = value;
      let Tstring = guildId + ".ControlChannels.AvailableNums";
      let updatedData = {
        $pull: {
          [Tstring]: bestNum,
        },
      };
    
      dbo.collection("servers").updateOne(query, updatedData);
      db.close();
    
      resolve(bestNum);
    });
  });
}


async function checkChannels(afterData, tmpC, AvNums) {
  tmpC.forEach(async function (ChId, index, arr) {
    let tCh = await afterData.guild.channels.resolve(ChId);
    
    if (tCh != null && tCh.members.size == 0) {
      console.log("Channel deleted: " + tCh.name);

      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var guildId = afterData.guild.id;
        let numberOfName = parseInt(tCh.name.slice(6), 10);
        var dbo = db.db("mydb");
        let name = guildId + ".id";
        let value = guildId;
        let query = {};
        query[name] = value;
        let Tstring = guildId + ".ControlChannels.AvailableNums";
        let Tstring2 = guildId + ".TemporaryChannels";
        let updatedData = {
          $push: {
            [Tstring]: numberOfName,
          },
        };
        let updatedData2 = {
          $pull: {
            [Tstring2]: ChId,
          },
        };
     
        if (!AvNums.includes(tCh.name.slice(6))) {
          dbo.collection("servers").updateOne(query, updatedData);
     
        }
        
        dbo.collection("servers").updateOne(query, updatedData2);
        db.close();
        
        tCh.delete();
      });
    } else if (tCh == null || tCh == undefined) {
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        
        var guildId = afterData.guild.id;
        var dbo = db.db("mydb");
        let name = guildId + ".id";
        let value = guildId;
        let query = {};
        query[name] = value;
        let Tstring2 = guildId + ".TemporaryChannels";
        let updatedData2 = {
          $pull: {
            [Tstring2]: ChId,
          },
        };
        
        dbo.collection("servers").updateOne(query, updatedData2);
        db.close();
      });
    }
  });
}
