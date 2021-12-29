import type { Page } from 'playwright-chromium'

import type { ConbiniName } from '@conbini-this-week/db/types'

export type Conbinis = {
  [Name in ConbiniName as Uppercase<Name>]: {
    name: Name
    url: (page?: number) => string
    gotoOptions?: Parameters<Page['goto']>[1]
    getPageCount?: (page: Page) => Promise<number>
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
