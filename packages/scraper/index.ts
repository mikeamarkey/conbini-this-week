import { chromium, Page } from 'playwright-chromium'
import { conbiniNames, conbinis } from './constants'

export async function scrape() {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  page.on('console', (message) => {
    if (message.type() === 'error') {
      console.error(message)
    }
  })
  await scrapeFamilyMart(page)
  await browser.close()
}

async function scrapeFamilyMart(page: Page) {
  const conbini = conbinis[conbiniNames.FAMILYMART]
  await page.goto(conbini.url)
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

  const uploadData = items.slice(0, 5)
  // eslint-disable-next-line no-console
  console.log(uploadData)
}

scrape()
