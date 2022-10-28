import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization } = req.headers
  if (authorization !== `Bearer ${process.env.API_SECRET_KEY}`) {
    res.status(401).send('Unauthorized')
    return
  }

  try {
    res.revalidate('/')
    return res.status(200).send(`Revalidation complete`)
  } catch (e) {
    res.status(500).send('Failed to revalidate')
  }
}
