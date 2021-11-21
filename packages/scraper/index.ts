import { scrape } from './scrape'
import 'dotenv/config'

async function main() {
  const conbiniName = 'familymart'
  const result = await scrape(conbiniName)
  console.log(result)
}

main()
