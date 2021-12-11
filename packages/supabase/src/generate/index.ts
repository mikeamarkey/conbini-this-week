import 'dotenv/config'
import { generateTypes } from './helpers'

const main = async () => {
  await generateTypes()
}

main()
