import { ConbiniName, Conbini } from './types'

export const conbiniNames: ConbiniName[] = [
  'dailyyamazaki',
  'familymart',
  'lawson',
  'ministop',
  'seveneleven',
]

export const conbinisMap: {
  [Name in ConbiniName]: Conbini & { name: Name }
} = {
  dailyyamazaki: {
    baseurl: 'https://www.daily-yamazaki.jp',
    displayName: 'Daily Yamazaki',
    hostname: 'daily-yamazaki.jp',
    name: 'dailyyamazaki',
  },
  familymart: {
    baseurl: 'https://www.family.co.jp',
    displayName: 'FamilyMart',
    hostname: 'family.co.jp',
    name: 'familymart',
  },
  lawson: {
    baseurl: 'https://www.lawson.co.jp',
    displayName: 'Lawson',
    hostname: 'lawson.co.jp',
    name: 'lawson',
  },
  ministop: {
    baseurl: 'https://www.ministop.co.jp',
    displayName: 'Ministop',
    hostname: 'ministop.co.jp',
    name: 'ministop',
  },
  seveneleven: {
    baseurl: 'https://www.sej.co.jp',
    displayName: '7/11',
    hostname: 'sej.co.jp',
    name: 'seveneleven',
  },
}

export const conbinis = Object.values(conbinisMap)
