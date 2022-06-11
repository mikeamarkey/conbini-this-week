import type { VercelRequest, VercelResponse } from '@vercel/node'
import { scrape, scrapeAll } from '../src/scrape'
import { isValidConbiniName } from '../src/utils'

export default async function (req: VercelRequest, res: VercelResponse) {
  const { authorization } = req.headers
  if (authorization !== `Bearer ${process.env.API_SECRET_KEY}`) {
    res.status(401).send('Unauthorized')
    return
  }

  const { name } = req.query
  if (!name || typeof name !== 'string') {
    res.status(400).send('Please provide a correct name')
    return
  }

  const conbiniName = name.toUpperCase()
  if (!isValidConbiniName(conbiniName)) {
    res.status(400).send('Please provide a correct name')
    return
  }

  try {
    if (conbiniName === 'ALL') {
      const result = await scrapeAll()
      res.status(200).send(`${result} items added`)
    } else {
      const result = await scrape(conbiniName)
      res.status(200).send(`${result} items from ${name} added`)
    }
  } catch (e) {
    console.log(e)
    res.status(500).send('Something went wrong...')
  }
}
