import type { ConbiniName } from '@conbini-this-week/db/types'

export const supabaseKey = process.env.SUPABASE_PRIVATE_KEY ?? ''
export const supabaseUrl = process.env.SUPABASE_API_URL ?? ''

const conbiniNames: { [Name in ConbiniName as Uppercase<Name>]: Name } = {
  FAMILYMART: 'familymart',
  LAWSON: 'lawson',
  SEVENELEVEN: 'seveneleven',
}

export const conbinis = {
  [conbiniNames.FAMILYMART]: {
    url: 'https://www.family.co.jp/goods/newgoods.html',
  },
  [conbiniNames.LAWSON]: {
    url: 'https://www.lawson.co.jp/recommend/new',
  },
  [conbiniNames.SEVENELEVEN]: {
    url: '',
  },
}
