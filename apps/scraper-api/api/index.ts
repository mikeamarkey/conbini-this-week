import type { VercelRequest, VercelResponse } from '@vercel/node'
import { conbinisMap } from '../../../packages/core/src'
import {
  scrape,
  scrapeAll,
  scrapeAllDry,
  scrapeDry,
} from '../../../packages/scraper/src/scrape'
import { isValidConbiniName } from '../../../packages/scraper/src/utils'

export default async function (req: VercelRequest, res: VercelResponse) {
  const { authorization } = req.headers
  if (authorization !== `Bearer ${process.env.API_SECRET_KEY}`) {
    res.status(401).send('Unauthorized')
    return
  }

  const { name, dry } = req.query
  if (!name || typeof name !== 'string') {
    res.status(400).send('Please provide a correct name')
    return
  }

  if (!isValidConbiniName(name)) {
    res.status(400).send('Please provide a correct name')
    return
  }

  const dryArg = typeof dry === 'string'

  try {
    if (name === 'all') {
      const result = await (dryArg ? scrapeAllDry() : scrapeAll())
      res.status(200).send(`${result} items added${dryArg ? ' (dry)' : ''}`)
    } else {
      const conbini = conbinisMap[name]
      const result = await (dryArg ? scrapeDry(name, true) : scrape(name))
      res
        .status(200)
        .send(
          `${result} items from ${conbini.displayName} added${
            dryArg ? ' (dry)' : ''
          }`
        )
    }
  } catch (e) {
    console.log(e)
    res.status(500).send('Something went wrong...')
  }
}
