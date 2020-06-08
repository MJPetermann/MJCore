var getData = require("./../MJModules/getData.js");
var manuelSetup = require("./../MJModules/manuelSetup.js");
module.exports = async (client, message) => {
     
    // Ignore all bots
    if (message.author.bot) return;
    
    if (message.guild == null) return;

    var guildId = message.guild.id;

    var [prefix,owner,setupStage] = await getData(guildId, "prfx-auth-sets");
    console.log(prefix + "\n" + owner+ "\n" + message.member.id) ;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if (!cmd) return;

    if(setupStage == 1 || setupStage == 100){
    
    cmd.run(client, message, args, owner);

    }else if(message.member.id == owner){

      manuelSetup(setupStage);
    }else{

      message.channel.send("You aren't allowed to send commands in Setupstage in 5 minutes it should be Setup.");
      
    }
};
