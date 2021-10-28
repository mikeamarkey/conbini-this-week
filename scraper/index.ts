import { chromium, Page } from 'playwright-chromium'
import { conbinis } from './constants'

export async function scrape(conbiniName: keyof typeof conbinis) {
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
        // replace with helpers if possible by injecting into page
        const href =
          el
            .querySelector<HTMLAnchorElement>('.ly-mod-infoset4-link')
            ?.href?.trim() ?? ''
        const title =
          el
            .querySelector<HTMLElement>('.ly-mod-infoset4-ttl')
            ?.textContent?.trim() ?? ''
        const category =
          el
            .querySelector<HTMLElement>('.ly-mod-infoset4-cate')
            ?.textContent?.trim() ?? ''
        const imgUrl =
          el.querySelector<HTMLImageElement>('.ly-mod-infoset4-img > img')
            ?.src ?? ''

        const priceMatches = el
          ?.querySelector<HTMLElement>('.ly-mod-infoset4-txt')
          ?.textContent?.match(/税込([\d,]+)円/)
        const price = priceMatches?.[1] ?? ''

        return {
          conbiniName: 'familymart',
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
