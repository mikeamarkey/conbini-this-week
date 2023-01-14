import 'dotenv/config'

import { scrape, scrapeAll, scrapeDry } from './scrape'
import { isValidConbiniName } from './utils'

const args = process.argv.slice(2)
const nameArg = args[0]
const dryArg = args[1] === '--dry'

export async function main(name: string) {
  if (!isValidConbiniName(name)) {
    console.log('Please provide a proper conbini name')
    return
  }

  try {
    if (name === 'all') {
      const result = await scrapeAll()
      console.log(`${result} items added`)
    } else {
      const result = await (dryArg ? scrapeDry(name) : scrape(name))
      console.log(`${result} items from ${name} added`)
    }
  } catch (e) {
    console.error(e)
  }
}

main(nameArg)
