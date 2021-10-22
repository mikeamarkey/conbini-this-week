import { chromium, Page } from 'playwright-chromium'
import { conbinis, conbiniNames, ValueOf } from './constants'
import {
  getStringValue,
  getHrefValue,
  getImgUrl,
  getRegexStringValue,
} from './helpers'

export async function scrape(conbiniName: ValueOf<typeof conbiniNames>) {
  const conbini = conbinis[conbiniName]
  if (typeof conbini === 'undefined') {
    return []
  }

  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(conbini.url)
  const items = await scrapeFamilyMart(page)
  return items
}

async function scrapeFamilyMart(page: Page) {
  const items = await page.$$eval(
    '.ly-goods-list-area .ly-mod-layout-clm',
    (els) => {
      return els.map((el) => {
        const href = getHrefValue('.ly-mod-infoset4-link', el)
        const title = getStringValue('.ly-mod-infoset4-ttl', el)
        const category = getStringValue('.ly-mod-infoset4-cate', el)
        const imgUrl = getImgUrl('.ly-mod-infoset4-img > img', el)
        const price = getRegexStringValue(
          '.ly-mod-infoset4-txt',
          /税込(\d+)円/,
          el
        )

        return {
          conbiniName: 'familymart' as const,
          href,
          title,
          category,
          imgUrl,
          price,
        }
      })
    }
  )

  return items
}
