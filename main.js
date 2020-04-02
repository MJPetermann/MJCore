//Adding Modules 
var fs = require('fs');
const Discord = require('discord.js');


//Adding custom Modules
var checkServer = require('D:/GitHub/mjcore/MJCore/MJModules/checkServer.js');
var createServer = require('D:/GitHub/mjcore/MJCore/MJModules/createServer.js');
var commands = require('D:/GitHub/mjcore/MJCore/MJModules/commands.js');

const client = new Discord.Client();
var contents = fs.readFileSync('D:/GitHub/mjcore/MJCore/key', 'utf8');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  // checking existence and creating non existent Object on MongoDB
  Array.from(client.guilds.cache).forEach(async function(value, index, arr){
    let exist = await checkServer(arr[index][0]);
    console.log(exist);
    if(!exist){
      createServer(arr[index][0], arr[index][1].owner.id);
    }
    
  });


});

client.on('voiceStateUpdate', () => {
  console.log("Veränderung");
});

client.on('message', commands(msg));

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(contents);