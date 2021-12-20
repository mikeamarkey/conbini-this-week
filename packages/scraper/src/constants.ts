import type { ConbiniName } from '@conbini-this-week/db/types'

export const supabaseKey = process.env.SUPABASE_PRIVATE_KEY ?? ''
export const supabaseUrl = process.env.SUPABASE_API_URL ?? ''

type Conbinis = {
  [key in ConbiniName]: {
    url: string
  }
}

export const conbinis: Conbinis = {
  familymart: {
    url: 'https://www.family.co.jp/goods/newgoods.html',
  },
  lawson: {
    url: '',
  },
  seveneleven: {
    url: '',
  },
}
