import { chromium, Page } from 'playwright-chromium'
import { conbinis, supabaseKey, supabaseUrl } from './constants'
import type { ConbiniName, InsertItem } from '@conbini-this-week/db/types'
import { Client } from '@conbini-this-week/db'

export async function scrape(conbiniName: ConbiniName) {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  page.on('console', (message) => {
    if (message.type() === 'error') {
      console.error(message)
    }
  })

  let count = 0
  switch (conbiniName) {
    case 'familymart':
      count += await scrapeFamilyMart(page)
      break
  }

  await browser.close()
  return `${count} items uploaded!`
}

async function scrapeFamilyMart(page: Page) {
  const conbini = conbinis.familymart
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
        const img =
          el.querySelector<HTMLImageElement>('.ly-mod-infoset4-img > img')
            ?.src ?? ''

        const priceMatches = el
          ?.querySelector<HTMLElement>('.ly-mod-infoset4-txt')
          ?.textContent?.match(/税込([\d,]+)円/)
        const price = Number(priceMatches?.[1] ?? '0')

        return {
          href,
          title,
          category,
          img,
          price,
        }
      })
    }
  )

  const uploadData: InsertItem[] = items.slice(0, 5).map((item) => {
    return { ...item, conbini: 'familymart' }
  })

  const client = new Client(supabaseUrl, supabaseKey)
  const uploadCount = client.insertItem(uploadData)
  return uploadCount
}
