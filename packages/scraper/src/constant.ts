import { conbinisMap } from '../../core/src'
import type { ConbiniConfig } from './types'

export const supabaseKey = process.env.SUPABASE_PRIVATE_KEY ?? ''
export const supabaseUrl = process.env.SUPABASE_API_URL ?? ''

export const conbinisConfig: ConbiniConfig = {
  dailyyamazaki: {
    ...conbinisMap.dailyyamazaki,
    selectors: {
      list: '.c-new-products__inner > div:first-of-type .c-products-list-sec',
      title: '.ttl',
      img: '.pic img',
      price: '.price .tax',
      priceRegex: /税込([\d,.]+)円/,
    },
  },
  familymart: {
    ...conbinisMap.familymart,
    selectors: {
      list: '.ly-goods-list-area .ly-mod-layout-clm',
      url: 'a',
      title: 'h3',
      category: 'p[class$="cate"]',
      img: 'img',
      price: 'p[class$="txt"]',
      priceRegex: /税込([\d,.]+)円/,
    },
  },
  lawson: {
    ...conbinisMap.lawson,
    selectors: {
      list: '.recommend ul.heightLineParent > li',
      url: 'a',
      title: '.ttl',
      img: '.img img',
      price: '.price',
      priceRegex: /([\d,.]+)円/,
    },
  },
  ministop: {
    ...conbinisMap.ministop,
    selectors: {
      list: '#recommendAreaInner .productList li.new',
      url: 'a',
      title: '.name',
      img: '.productListPhoto > img',
      price: '.price',
      priceRegex: /税込([\d,.]+)円/,
    },
  },
  seveneleven: {
    ...conbinisMap.seveneleven,
    selectors: {
      list: '.pbMainArea .pbNested .pbNestedWrapper .list_inner',
      url: 'a',
      title: '.detail .item_ttl',
      img: 'a > img',
      imgDataName: 'original',
      price: '.detail .item_price',
      priceRegex: /税込([\d,.]+)円/,
    },
  },
} as const
