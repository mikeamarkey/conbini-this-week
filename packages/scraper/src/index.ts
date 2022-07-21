import 'dotenv/config'

import { scrape, scrapeAll } from './scrape'
import { isValidConbiniName } from './utils'

const args = process.argv.slice(2)
const nameArg = args[0]

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
      const result = await scrape(name)
      console.log(`${result} items from ${name} added`)
    }
  } catch (e) {
    console.error(e)
  }
}

main(nameArg)
