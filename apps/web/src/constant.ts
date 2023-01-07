import { Conbini } from 'types'

export const apiUrl = process.env.NEXT_SUPABASE_API_URL ?? ''
export const publicKey = process.env.NEXT_SUPABASE_PUBLIC_KEY ?? ''

export const repoUrl = 'https://github.com/mikeamarkey/conbini-this-week'

export const conbinis: Conbini = {
  familymart: {
    name: 'FamilyMart',
  },
  lawson: {
    name: 'Lawson',
  },
  ministop: {
    name: 'Ministop',
  },
  seveneleven: {
    name: '7/11',
  },
}
