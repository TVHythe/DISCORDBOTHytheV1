const discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{

    return message.channel.send("Totziens!");

}

module.exports.help = {
    name: "doei"
}