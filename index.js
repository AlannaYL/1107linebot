import 'dotenv/config'
import linebot from 'linebot'
import simple from './commands/simple.js'
import fetchExhibitions from './commands/fetchExhibitions.js'

const bot = linebot({
  channelid: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', event => {
  console.log(event.message)
  if (event.message.type === 'location') {
    fetchMap(event)
  } else if (event.message.type !== 'text') return
  if (event.message.text === '新展覽') {
    fetchExhibitions(event)
  } else {
    simple(event)
  }
})
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
