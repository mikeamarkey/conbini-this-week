import { NextApiRequest, NextApiResponse } from 'next'

const handler = (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send('hi')
}

export default handler
