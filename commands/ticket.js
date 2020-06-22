const discord = require("discord.js");

module.exports.run = async(bot, message, arguments) =>{

    const categoryID = "724641605893488741"

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;


    var ticketBestaat = false;

    message.guild.channels.cache.forEach(channel => {

        if(channel.name == userName.toLowerCase() + "-" + userDiscriminator)  {
            ticketBestaat = true;

            message.reply("Je hebt nog een ticket openstaan!");

            return;
        }

    });

    if(ticketBestaat) return;
    
    var embed = new discord.MessageEmbed()
        .setTitle("Hey " + message.author.username)
        .setFooter("Ticket word aangemaakt!");

        message.channel.send(embed)

        message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, {type: 'text'}).then(
            (createdChannel) => {
                createdChannel.setParent(categoryID).then(
                    (settedParent) => {

                        settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                           SEND_MESSAGES: false,
                           VIEW_CHANNEL: false
                        });

                        settedParent.updateOverwrite(message.author.id, {
                            CREATE_INSTANT_INVITE: false,
                            SEND_MESSAGES: true,
                            READ_MESSAGES: true,
                            ATTACH_FILES: true,
                            CONNECT: true,
                            ADD_REACTIONS: true,
                            READ_MESSAGE_HISTORY: true
                         });
 

                         var embedParent = new discord.MessageEmbed()
                         .setTitle(`Hey ${message.author.username}`)
                         .setDescription("Vul hier je ticket in, en misschien kunnen wij wat voor je betekenen.");

                        settedParent.send(embedParent);

                    
                    }
                ).catch(err => {
                    message.channel.send("Oeps! Er is iets fout gegaan!");
                });

            }
        ).catch(err => {
            message.channel.send("Oeps! Er is iets fout gegaan!");
        });
        




}

module.exports.help = {
    name: "ticket"
}