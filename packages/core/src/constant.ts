import { type ConbiniMap, type ConbiniName } from './types'

export const conbiniNames: ConbiniName[] = [
  'dailyyamazaki',
  'familymart',
  'lawson',
  'ministop',
  'seveneleven',
]

export const conbinisMap: ConbiniMap = {
  dailyyamazaki: {
    baseurl: 'https://www.daily-yamazaki.jp',
    displayName: 'Daily Yamazaki',
    hostname: 'daily-yamazaki.jp',
    name: 'dailyyamazaki',
    newItemsUrl: () => 'https://www.daily-yamazaki.jp/new/',
  },
  familymart: {
    baseurl: 'https://www.family.co.jp',
    displayName: 'FamilyMart',
    hostname: 'family.co.jp',
    name: 'familymart',
    newItemsUrl: () => 'https://www.family.co.jp/goods/newgoods.html',
  },
  lawson: {
    baseurl: 'https://www.lawson.co.jp',
    displayName: 'Lawson',
    hostname: 'lawson.co.jp',
    name: 'lawson',
    newItemsUrl: () => 'https://www.lawson.co.jp/recommend/new/',
  },
  ministop: {
    baseurl: 'https://www.ministop.co.jp',
    displayName: 'Ministop',
    hostname: 'ministop.co.jp',
    name: 'ministop',
    newItemsUrl: () => 'https://www.ministop.co.jp/syohin/js/recommend.json',
  },
  seveneleven: {
    baseurl: 'https://www.sej.co.jp',
    displayName: '7/11',
    hostname: 'sej.co.jp',
    name: 'seveneleven',
    newItemsUrl: (page = 1) =>
      `https://www.sej.co.jp/products/a/thisweek/area/hokuriku/${page}/l100/`,
  },
}

export const conbinis = Object.values(conbinisMap)
