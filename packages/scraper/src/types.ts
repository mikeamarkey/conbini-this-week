import type { ConbiniMap } from '../../core/src'

export type SelectorMap = {
  category?: string
  img: string
  imgDataName?: string
  list: string
  price: string
  priceRegex: RegExp
  title: string
  url?: string
}

export type ConbiniConfig = {
  [Name in keyof ConbiniMap]: ConbiniMap[Name] & {
    selectors: SelectorMap
  }
}
