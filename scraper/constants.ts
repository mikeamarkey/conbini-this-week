export const conbiniNames = {
  FAMILYMART: 'familymart',
} as const

export const conbinis = {
  [conbiniNames.FAMILYMART]: {
    url: 'https://www.family.co.jp/goods/newgoods/nextweek.html',
  },
} as const

export type ValueOf<T> = T[keyof T]
