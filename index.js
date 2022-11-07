import 'dotenv/config'
import linebot from 'linebot'
import fetchExhibition from './commands/fetchExhibition.js'

const bot = linebot({
  channelid: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', event => {
  if (event.message.type !== 'text') return
  fetchExhibition(event)
})
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
