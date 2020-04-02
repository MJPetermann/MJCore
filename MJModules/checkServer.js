var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var url = fs.readFileSync('D:/GitHub/mjcore/MJCore/url', 'utf8');
module.exports = (guildId) => {
  return new Promise(resolve => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      let name = guildId + ".id"; 
      let value = guildId;
      let query = {};
      query[name] = value;
      dbo.collection("servers").findOne(query, (err, result)=>{
        if(err) throw err;
        console.log(result);
        if(result == null){
          resolve(false);
          
        }else{
          resolve(true);
          
        }
      });
      db.close();
    });
  });
}