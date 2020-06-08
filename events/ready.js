var checkServer = require("./../MJModules/checkServer.js");
var createServer = require("./../MJModules/createServer.js");
var checkVersion = require("./../MJModules/checkVersion.js");
var update = require("./../MJModules/update.js");
module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    // checking existence and creating non existent Object on MongoDB
    Array.from(client.guilds.cache).forEach(async function(value, index, arr){
            let exist = await checkServer(arr[index][0]);
            if(!exist){
                createServer(arr[index][0], arr[index][1].owner.id);
            }else{
                if(await checkVersion(arr[index][0]) == false) update(arr[index][0]);
                
            }
      
    });
    console.log("Checked all Servers");


}