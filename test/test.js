import axios from 'axios'
import * as cheerio from 'cheerio'

const main = async (event) => {
  try {
    const { data } = await axios.get('https://artemperor.tw/tidbits')
    const $ = cheerio.load(data)
    // const Exhibitions = []
    $('.list_box').each(function (event) {
      // const bubble = JSON.parse(JSON.stringify(template))
      // Exhibitions.push(bubble)
      if (event.message.text === $(this).find('h2').text().trim()) {
        console.log($(this).find('h2').text().trim())

        // console.log(event.message.text === $(this).includes($(this).find('h2').text().trim()))
      }

      // console.log(Exhibitions)
    }
  } catch (error) {
    console.log(error)
  }

  main('散步日常')
