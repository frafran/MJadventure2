const Discord = require('discord.js')
require('dotenv').config()
const bot = new Discord.Client()
const fs = require('fs')

bot.on('ready', () => {
  // List servers the bot is connected to
  console.log("Servers:")
  bot.guilds.forEach((guild) => {
      console.log(" - " + guild.name)

      // List all channels
      guild.channels.forEach((channel) => {
          console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
      })
  })
})
fs.readdir('./events/', (err, files) => {
    files.forEach(file => {
      const eventHandler = require(`./events/${file}`)
      const eventName = file.split('.')[0]
      bot.on(eventName, (...args) => eventHandler(bot, ...args))
    })
  })
bot.login(process.env.BOT_TOKEN)