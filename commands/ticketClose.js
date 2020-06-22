const discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{

    const categoryID = "724641605893488741";

    if(!message.member.hasPermission("KICK_MEMBER")) return message.reply("Alleen Staff kan een ticket sluiten!")


    if(message.channel.parentID == categoryID) {
        message.channel.delete();
   
            // Create embed.
    var embedCreateTicket = new discord.MessageEmbed()
    .setTitle("Ticket, " + message.channel.name)
    .setDescription("De ticket is gemarkeerd als **gesloten**.")
    .setFooter("Ticked gesloten");

    // Channel voor logging
    var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "log");
    if (!ticketChannel) return message.reply("Kanaal bestaat niet!")

    ticketChannel.send(embedCreateTicket)
   
    } else {

        message.channel.send("Dit kan alleen bij een ticket!");


    }
}

module.exports.help = {
    name: "close"
}