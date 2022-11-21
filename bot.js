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

  // mmow
  if (msg.content.toLowerCase().includes('mmow')) {
    msg.react('<:mmow:1029476169575301182>')
  }

  // commands
  if (msg.content.startsWith(prefix)) {
    const args = msg.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    // woof command
    if (command === 'woof') {
      msg.channel.send('Woof Woof!')
    }

    // yn command
    if (command === 'yn') {
      const answer = ['Yes!', 'No!'][Math.floor(Math.random() * 2)]
      msg.reply(answer)
    }

    // choose command
    if (command === 'choose') {
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
    if (command === 'settime') {
      if (args.length === 0) {
        msg.channel.send({
          embeds: [
            {
              title: "!settime",
              color: 10038562,
              fields: [
                { name: 'Format', value: `!settime # {minutes/hours/days}, {gamename}, {people}` },
                { name: 'Example', value: `!settime 5 hours, Fornite, @jack @diane` }
              ],
            },
          ],
        })
        return
      }
      const information = args.join(' ').split(',')
      if (information.length != 3) {
        msg.channel.send({
          embeds: [
            {
              title: "Error:",
              color: 10038562,
              description: "All arguments (time/game/people) must be filled.",
              fields: [
                { name: 'Example', value: `!settime 5 hours, Fornite, @jack @diane` }
              ],
            },
          ],
        })
        return
      }
      const time = information[0].split(' ')
      if (time.length != 2 || !Number(time[0])) {
        msg.channel.send({
          embeds: [
            {
              title: "Error:",
              color: 10038562,
              description: "Time must be filled correctly.",
              fields: [
                { name: 'Example', value: `!settime 5 hours, Fornite, @jack @diane` }
              ],
            },
          ],
        })
        return
      }
      const unit = time[1]
      const current = new Date()
      let newTime
      if (
        unit === 'second' ||
        unit === 'seconds' ||
        unit === 'sec' ||
        unit === 'secs' ||
        unit === 's'
      ) {
        msg.reply('bruh')
        return
      }
      if (
        unit === 'minute' ||
        unit === 'minutes' ||
        unit === 'min' ||
        unit === 'mins' ||
        unit === 'm'
      ) {
        newTime = current.getTime() + time[0] * 60000
      }
      if (
        unit === 'hour' ||
        unit === 'hours' ||
        unit === 'hr' ||
        unit === 'hrs' ||
        unit === 'h'
      ) {
        newTime = current.getTime() + time[0] * 3600000
      }
      if (unit === 'day' || unit === 'days' || unit === 'd') {
        newTime = current.getTime() + time[0] * 86400000
      }
      msg.channel.send({
        embeds: [
          {
            color: 5763719,
            fields: [
              { name: 'Time', value: `<t:${Math.floor(newTime / 1000)}:f>` },
              { name: 'Game', value: information[1] },
              { name: 'People', value: information[2] },
            ],
          },
        ],
      })
    }
  }
})

client.login(config.token)
