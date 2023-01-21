import 'dotenv/config'
import { conbinisMap } from '@conbini-this-week/core'

import { scrape, scrapeAll, scrapeAllDry, scrapeDry } from './scrape'
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
      const result = await (dryArg ? scrapeAllDry() : scrapeAll())
      console.log(`${result} items added${dryArg ? ` (dry)` : ''}`)
    } else {
      const conbini = conbinisMap[name]
      const result = await (dryArg ? scrapeDry(name, true) : scrape(name))
      console.log(
        `${result} items from ${conbini.displayName} added${
          dryArg ? ` (dry)` : ''
        }`
      )
    }
  } catch (e) {
    console.error(e)
  }
}

main(nameArg)
