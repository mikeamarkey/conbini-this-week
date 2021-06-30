import { NextApiRequest, NextApiResponse } from 'next'
import { scrape } from '../../scraper'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { conbiniName },
  } = req

  try {
    const result = await scrape(conbiniName)
    res.status(200).json(result)
  } catch (e) {
    res.status(200).json(e)
  }
}

export default handler
