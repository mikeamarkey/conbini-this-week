import { chromium, Page } from 'playwright-chromium'
import { conbinis } from './constants'
import { ConbiniItem } from './types'

export async function scrape(conbiniName): Promise<ConbiniItem[]> {
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

async function scrapeFamilyMart(page: Page): Promise<ConbiniItem[]> {
  const items = await page.$$eval(
    '.ly-goods-list-area .ly-mod-layout-clm',
    (els) => {
      return els.map((el) => {
        const anchorElement = el.querySelector(
          '.ly-mod-infoset4-link'
        ) as HTMLAnchorElement
        const href = anchorElement.href.trim()
        const title = el
          .querySelector('.ly-mod-infoset4-ttl')
          .textContent.trim()
        const category = el
          .querySelector('.ly-mod-infoset4-cate')
          .textContent.trim()
        const imageElement = el.querySelector(
          '.ly-mod-infoset4-img > img'
        ) as HTMLImageElement
        const imgUrl = imageElement.src
        const hasPrice = el
          .querySelector('.ly-mod-infoset4-txt')
          .textContent.match(/税込(\d+)円/)
        const price = hasPrice && hasPrice[1] ? hasPrice[1] : ''

        return {
          conbiniName: 'familyMart' as const,
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
