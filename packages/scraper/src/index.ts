import 'dotenv/config'

import type { ConbiniNames } from './types'
import { scrape } from './scrape'
import { conbinis } from './constants'

const args = process.argv.slice(2)
const nameArg = args[0]

const isValidConbiniName = (
  conbiniName: string
): conbiniName is ConbiniNames => {
  return conbiniName in conbinis
}

async function main() {
  const conbiniName = nameArg.toUpperCase()
  if (!isValidConbiniName(conbiniName)) {
    console.log('Please provide a proper conbini name')
    return
  }

  const result = await scrape(conbiniName)
  console.log(result)
}

main()
