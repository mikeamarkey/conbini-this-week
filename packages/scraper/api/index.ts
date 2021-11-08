// import { createClient } from '@supabase/supabase-js'
import { VercelRequest, VercelResponse } from '@vercel/node'
import { scrape } from '../scrape'

export default async (request: VercelRequest, response: VercelResponse) => {
  const { conbiniName } = request.query
  try {
    if (typeof conbiniName === 'string') {
      const result = await scrape(conbiniName)
      response.status(200).json(result)
    } else {
      response.status(200).send(`${conbiniName} is not a valid conbininame`)
    }
  } catch (e) {
    response.status(500).send(e)
  }
}
