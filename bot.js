const config = require('./config.json')

const prefix = '!'

const { Client, GatewayIntentBits } = require('discord.js')
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
})

// object to store countdown information
const countdowns = {}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('messageCreate', async (msg) => {
  // don't respond to bots
  if (msg.author.bot) return

  // responds to woof with woof
  if (msg.content.split('').slice(0, 4).join('').toLowerCase() === 'woof') {
    msg.channel.send('Woof!')
  }

  // commands
  if (msg.content.startsWith(prefix)) {
    const args  = msg.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    // woof command
    if (command === 'woof') {
      msg.channel.send("Woof Woof!")
    }

    // yn command
    if (command === "yn") {
      const answer = ['Yes!', 'No!'][Math.floor(Math.random() * 2)]
      msg.reply(answer)
    }

    // choose command
    if (command === "choose") {
      if (args.length === 0) return
      const choices = args.join(' ').split(',')
      const answer = choices[Math.floor(Math.random() * choices.length)]
      msg.reply(answer.trim())
    }

    // set countdown command WIP
    if (command === 'setcountdown') {
      if (args.length === 0) return
      const game = args.shift().toLowerCase() || null
      msg.reply(`Countdown set for ${game}!`)
      countdowns[game] = 1
      console.log(countdowns)
    }

    // settime WIP
    // if (command === 'settime') {

    // }
  }


})

client.login(config.token)
