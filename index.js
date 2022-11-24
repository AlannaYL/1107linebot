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
  if (event.message.type !== 'text') return
  else if (event.message.text === '查詢展覽') {
    fetchExhibitions(event)
  } else if (event.message.text === '我該如何使用？') {
    event.reply('如果想找尋最新展覽，請點選展覽查詢')
  } else {
    simple(event)
  }
})
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
