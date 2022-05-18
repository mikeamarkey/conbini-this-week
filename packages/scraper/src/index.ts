import 'dotenv/config'

import type { ConbiniNames } from './types'
import { scrape, scrapeAll } from './scrape'
import { conbinis } from './constants'

const args = process.argv.slice(2)
const nameArg = args[0]

const isValidConbiniName = (
  conbiniName: string
): conbiniName is ConbiniNames | 'ALL' => {
  return conbiniName in conbinis || conbiniName === 'ALL'
}

async function main() {
  const conbiniName = nameArg.toUpperCase()
  if (!isValidConbiniName(conbiniName)) {
    console.log('Please provide a proper conbini name')
    return
  }

  try {
    if (conbiniName === 'ALL') {
      await scrapeAll()
    } else {
      await scrape(conbiniName)
    }
    console.log('Done scraping :-)')
  } catch (e) {
    console.error(e)
  }
}

main()
