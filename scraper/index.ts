import { chromium } from 'playwright-chromium'
import { conbinis } from './constants'

export async function scrape(conbiniName) {
  const conbini = conbinis[conbiniName]
  if (typeof conbini === 'undefined') {
    return []
  }

  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(conbini.url)
  const items = await page.$$eval(
    '.ly-goods-list-area .ly-mod-layout-clm',
    (els, conbiniName) => {
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
          conbiniName,
          href,
          title,
          category,
          imgUrl,
          price,
        }
      })
    },
    conbiniName
  )

  return items
}
