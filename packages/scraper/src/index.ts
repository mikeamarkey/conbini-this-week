import 'dotenv/config'

import type { ConbiniName } from './types'
import { scrape, scrapeAll } from './scrape'
import { conbinis } from './constants'

const args = process.argv.slice(2)
const nameArg = args[0]

const isValidArg = (name: string): name is ConbiniName | 'all' => {
  return name in conbinis || name === 'all'
}

async function main() {
  if (!isValidArg(nameArg)) {
    console.log('Please provide a proper conbini name')
    return
  }

  try {
    if (nameArg === 'all') {
      await scrapeAll()
    } else {
      await scrape(nameArg)
    }
    console.log('Done scraping :-)')
  } catch (e) {
    console.error(e)
  }
}

main()
