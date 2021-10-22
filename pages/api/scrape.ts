import { NextApiRequest, NextApiResponse } from 'next'
import { scrape } from '../../scraper'
import { conbiniNames, ValueOf } from '../../scraper/constants'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { conbiniName },
  } = req

  try {
    const result = await scrape(conbiniName as ValueOf<typeof conbiniNames>)

    res.status(200).json(result)
  } catch (e) {
    res.status(400).json(e)
  }
}

export default handler
