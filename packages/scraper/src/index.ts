import 'dotenv/config'
import { conbinisMap } from '../../core/src'

import { scrape, scrapeAll, scrapeAllDry, scrapeDry } from './scrape'
import { isValidConbiniName } from './utils'

const args = process.argv.slice(2)
const nameArg = args[0]
const dryArg = args[1]

export async function main(name: string) {
  if (!isValidConbiniName(name)) {
    throw new Error('Please provide a proper conbini name')
  }

  if (dryArg && dryArg !== '--dry') {
    throw new Error('Accepted flags are: --dry')
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
