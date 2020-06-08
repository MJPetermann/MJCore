exports.run = (client, message, args, owner) => {
    if(message.member.id !== owner) {
        message.channel.send("You're not the Owner! You aren't allowed to execute this commmand!").catch(console.error);
    }else{
        if(args.length == 0){
            message.channel.send("Deside between: \n **auto** : Creates new channels for every feature i have. Usage: `!setup auto`.\n **manuel** : Use channels, which exist and individual deside which fetures you want. Usage: `!setup manuel`.");
        
        }else if (args[0] == "auto"){
            message.channel.send("You chose: **auto** mode!");
            
        }else if(args[0] == "manuel"){
            message.channel.send("You chose: **manuel** mode!");

        }else message.channel.send("Wrong command usage try `!help` to find the right one!");
        console.log(args);
    }

}