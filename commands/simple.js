import axios from 'axios'
import * as cheerio from 'cheerio'
import template from '../templates/tem.js'
import writejson from '../untils/writejson.js'

export default async (event) => {
  try {
    const { data } = await axios.get('https://artemperor.tw/tidbits')
    const $ = cheerio.load(data)
    const bubble = JSON.parse(JSON.stringify(template))
    const Exhibitions = []

    $('.list_box').each(function () {
      // console.log($(this).find('h2').text())
      if ($(this).find('h2').text().includes(event.message.text)) {
        bubble.body.contents[0].text = $(this).find('h2').text()
        bubble.hero.url = encodeURI($(this).find('.pic').attr('style').substring(21, 129).trim())
        bubble.body.contents[1].contents[0].contents[1].text = $(this).find('p').text().trim()
        bubble.footer.contents[0].action.uri = $(this).find('.tag a').attr('href')
        Exhibitions.push(bubble)
      }
    })

    const reply = {
      type: 'flex',
      altText: '展覽查詢結果',
      contents: {
        type: 'carousel',
        contents: Exhibitions
      }
    }
    event.reply(reply)
    if (process.env.WRITEJSON) {
      writejson(reply, 'simple')
    }
  } catch (error) {
    console.log(error)
    event.reply('尋找資料中，請稍後試試看')
  }
}
