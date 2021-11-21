import 'dotenv/config'
import { scrape } from './scrape'
import { conbinis } from './constants'

async function main() {
  const conbiniName = 'familymart'
  if (!(conbiniName in conbinis)) {
    console.log('Please provide a proper conbini name')
    return
  }

  const result = await scrape(conbiniName)
  console.log(result)
}

main()
