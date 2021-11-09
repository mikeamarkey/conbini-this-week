import { scrape } from './scrape'
import 'dotenv/config'

async function main() {
  const conbiniName = 'familymart'
  const result = await scrape(conbiniName)
  // eslint-disable-next-line no-console
  console.log(result)
}

main()
