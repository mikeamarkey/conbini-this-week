import 'dotenv/config'
import { scrape } from './scrape'
import { conbinis } from './constants'
import { ConbiniName } from '../../supabase/src/db/types'

const args = process.argv.slice(2)
const conbiniName = args[0]

const isValidConbiniName = (
  conbiniName: string
): conbiniName is ConbiniName => {
  return conbiniName in conbinis
}

async function main() {
  if (!isValidConbiniName(conbiniName)) {
    console.log('Please provide a proper conbini name')
    return
  }

  const result = await scrape(conbiniName)
  console.log(result)
}

main()
