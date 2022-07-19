import type { Conbinis } from './types'

export const supabaseKey = process.env.SUPABASE_PRIVATE_KEY ?? ''
export const supabaseUrl = process.env.SUPABASE_API_URL ?? ''

export const conbinis: Conbinis = {
  FAMILYMART: {
    name: 'familymart',
    rootUrl: 'https://www.family.co.jp',
    listUrl: () => 'https://www.family.co.jp/goods/newgoods.html',
    selectors: {
      list: '.ly-goods-list-area .ly-mod-layout-clm',
      url: '.ly-mod-infoset4-link',
      title: '.ly-mod-infoset4-ttl',
      category: '.ly-mod-infoset4-cate',
      img: '.ly-mod-infoset4-img > img',
      price: '.ly-mod-infoset4-txt',
      priceRegex: /税込([\d,.]+)円/,
    },
  },
  LAWSON: {
    name: 'lawson',
    rootUrl: 'https://www.lawson.co.jp',
    listUrl: () => 'https://www.lawson.co.jp/recommend/new/',
    selectors: {
      list: '.recommend ul.heightLineParent > li',
      url: 'a',
      title: '.ttl',
      img: '.img img',
      price: '.price',
      priceRegex: /([\d,.]+)円/,
    },
  },
  SEVENELEVEN: {
    name: 'seveneleven',
    rootUrl: 'https://www.sej.co.jp',
    listUrl: (page = 1) =>
      `https://www.sej.co.jp/products/a/thisweek/area/hokuriku/${page}/l100/`,
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
