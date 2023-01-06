import 'dotenv/config'
import { promises as fs } from 'fs'
import openapiTS from 'openapi-typescript'
import { codegenUrl, writeFileName } from './constant'

const main = async () => {
  const output = await openapiTS(codegenUrl)
  console.log(`Writing types to "${writeFileName}"`)
  await fs.writeFile(writeFileName, output)
  console.log('Done!')
}

main()
