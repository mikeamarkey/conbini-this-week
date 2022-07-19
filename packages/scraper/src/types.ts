import type { ConbiniName } from '@conbini-this-week/db/types'

export type Conbinis = {
  [Name in ConbiniName as Uppercase<Name>]: {
    name: Name
    rootUrl: string
    listUrl: (page?: number) => string
    selectors: {
      list: string
      url: string
      title: string
      img: string
      imgDataName?: string
      price: string
      priceRegex: RegExp
      category?: string
    }
  }
}

export type ConbiniNames = keyof Conbinis
