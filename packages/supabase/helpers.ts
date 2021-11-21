import { promises as fs } from 'fs'
import openapiTS from 'openapi-typescript'
import { codegenUrl, writeDirName, writeFileName } from './constants'

const isDirectory = async (path: string) => {
  try {
    const exists = await fs.stat(path)
    return exists && exists.isDirectory()
  } catch (e) {
    return false
  }
}

export const generateTypes = async () => {
  const output = await openapiTS(codegenUrl)
  if (!(await isDirectory(writeDirName))) {
    console.log(`Creating write directory at "${writeDirName}"`)
    await fs.mkdir(writeDirName)
  }
  console.log(`Writing types to "${writeFileName}"`)
  await fs.writeFile(writeFileName, output)
  console.log('Done!')
}
