const Discord = require('discord.js');
const db = require('quick.db');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  if (message.guild.id !== "696515024746709003") return;
  
  if (message.member.hasPermission('KICK_MEMBERS')) {
    
    let user = message.guild.member(bot.users.cache.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase()))) || message.mentions.members.first() || bot.users.cache.find(user => user.id === args[0]);
    
    if (!user) return message.channel.send("user not found.");

    if (user.tag === "Podel#8232") return;   

    let warns = db.fetch(`warnCount_${user.user.id}`);
    
    if (warns === null) return message.channel.send('that user has no warns to clear.');
      
      let embed = new Discord.MessageEmbed()
      .setTitle(`${user.user.tag} | Cleared Warns`)
      .addField('Count', warns)
      .setThumbnail(user.user.displayAvatarURL())
      .setColor(colour)
      .setTimestamp()
      .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL())
      
      await (message.delete());
      
      await bot.guilds.cache.get("696515024746709003").channels.cache.get("704356972606259220").send(embed);
      
      await db.delete(`warnCount_${user.user.id}`);
      
    }
  };

module.exports.help = {
  name: "clearwarn",
  aliases: ['cw']
}
