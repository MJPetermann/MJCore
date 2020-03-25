var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://ccbot:XPLwHTozpLjk3BSY@mjpcluster-cc8vq.mongodb.net/MJCore";
const Discord = require('discord.js');
const client = new Discord.Client();
var fs = require('fs');
var contents = fs.readFileSync('key', 'utf8');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("servers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
    });
});

client.login(contents);