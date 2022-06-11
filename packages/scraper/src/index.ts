import 'dotenv/config'

import { scrape, scrapeAll } from 'scrape'
import { isValidConbiniName } from 'utils'

const args = process.argv.slice(2)
const nameArg = args[0]

export async function main(name: string) {
  if (!isValidConbiniName(name)) {
    console.log('Please provide a proper conbini name')
    return
  }

  try {
    if (name === 'all') {
      await scrapeAll()
    } else {
      await scrape(name)
    }
    console.log('Done scraping :-)')
  } catch (e) {
    console.error(e)
  }
}

main(nameArg)
