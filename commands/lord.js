const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../config.json"),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {
  let amount = args[0];
  
  if (amount > 2) return message.channel.send('I can\'t keep being alive for more than 2 weeks due to limited hardware, if you want to change that you can **donate** here: https://patreon.com/cristpz')

  let balance = db.fetch(`balance_${message.author.id}`);
  let astra = db.fetch(`astra_${message.author.id}`);
  let lordpass = db.fetch(`lord_${message.author.id}`);

  const astraemoji = bot.emojis.find(emoji => emoji.name === `astra`);
  const lordemoji = bot.emojis.find(emoji => emoji.name === `lordpass`);

  let lordcode = Math.floor(Math.random() * 1000000000);

  let role = message.guild.roles.find(role => role.name === "House of Lords");
  if (lordpass < amount)
    return message.channel.send("check your inventory again");
  if (amount <= 0) return;
  if (amount === NaN) return;
  if (!amount) return;
  db.subtract(`lord_${message.author.id}`, amount);
  message.channel.send(`lording activated for ${args[0]} week(s) (${lordcode})`);
  await message.member.addRole(role);
  await bot.guilds
    .get("644551231020204062")
    .channels.get("715368997725667398")
    .send(
      `${message.author.tag} just started lording (${
        args[0]
      } week(s) | Lord Code ${lordcode})`
    );
  setTimeout(function() {
    let role = message.guild.roles.find(
      role => role.name === "House of Lords"
    );
    message.member.removeRole(role);
    bot.guilds
      .get("644551231020204062")
      .channels.get("715368997725667398")
      .send(
        `${message.author.tag} is not lording anymore (lording lasted ${
          args[0]
        } week(s) | Lord Code: ${lordcode})`
      );
  }, 1814.4e6 * args[0]);
};

module.exports.help = {
  name: "lord"
}