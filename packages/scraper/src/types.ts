import type { ConbiniName as DBConbiniName } from '../../../packages/supabase/src/db/types'

export type Conbini = {
  [name in DBConbiniName]: {
    name: name
    baseUrl: string
    newItemsUrl: (page?: number) => string
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

export type ConbiniName = keyof Conbini
