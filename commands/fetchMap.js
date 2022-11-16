import axios from 'axios'
import * as cheerio from 'cheerio'
import writejson from '../untils/writejson.js'
import googlelocation from '../location/googlelocation.js'
import location from '../location/location.js'

export default async (event) => {
	try {
		const { data } = await axios.get('https://artemperor.tw/tidbits')
		const $ = cheerio.load(data)
		// const bubble = JSON.parse(JSON.stringify(template))
		const Exhibitions = []
		const maps = []

		let line = ''
		$('.list_box').each(function () {
			line = $(this).find('.tag a').attr('href')
		})
		let maplocation = $$('.exb_info').find('li').eq('1').find('p').text().trim()
		maps.push(maplocation)

		for (let i in maps) {
			googlelocation(maps[i])
		}


		location(event.message.latitude, event.message.longitude)

		const { data: a } = await axios.get(line)
		const $$ = cheerio.load(a)
	} catch (error) {
		console.log(error)
		event.reply('尋找展覽中，請稍後試試看或更換關鍵字')
	}
}