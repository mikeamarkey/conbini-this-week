import { chromium, Page } from 'playwright-chromium'

import { Client } from '@conbini-this-week/db'
import type { InsertItem } from '@conbini-this-week/db/types'
import type { ConbiniNames } from './types'
import { conbinis, supabaseKey, supabaseUrl } from './constants'

export async function scrape(conbiniName: ConbiniNames) {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  page.on('console', (message) => {
    if (message.type() === 'error') {
      console.error(message)
    }
  })

  const items = await scrapeConbini(conbiniName, page)
  const uploadData: InsertItem[] = items.slice(0, 10)
  console.log(items)
  const client = new Client(supabaseUrl, supabaseKey)
  const count = await client.insertItem(uploadData)
  await browser.close()
  return `${count} items uploaded!`
}

async function scrapeConbini(conbiniName: ConbiniNames, page: Page) {
  const conbini = conbinis[conbiniName]
  const collectedItems: InsertItem[] = []
  await page.goto(conbini.url(), { ...(conbini.gotoOptions ?? {}) })
  const pageCount = !conbini.getPageCount ? 1 : await conbini.getPageCount(page)
  for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
    if (pageNum !== 1) {
      await page.goto(conbini.url(pageNum), { ...(conbini.gotoOptions ?? {}) })
    }
    const newItems = await collectPageItems(page, conbini)
    collectedItems.push(...newItems)
  }
  return collectedItems
}

async function collectPageItems(
  page: Page,
  conbini: typeof conbinis[keyof typeof conbinis]
): Promise<InsertItem[]> {
  const { selectors } = conbini
  const items = await page.$$eval(
    selectors.list,
    (els, selectors) => {
      return els.map((el) => {
        const url =
          el.querySelector<HTMLAnchorElement>(selectors.url)?.href?.trim() ?? ''
        const title =
          el.querySelector<HTMLElement>(selectors.title)?.textContent?.trim() ??
          ''
        const img = selectors.imgDataName
          ? el.querySelector<HTMLImageElement>(selectors.img)?.dataset[
              selectors.imgDataName
            ] ?? ''
          : el.querySelector<HTMLImageElement>(selectors.img)?.src ?? ''
        const priceMatches = el
          ?.querySelector<HTMLElement>(selectors.price)
          ?.textContent?.match(selectors.priceRegex)
        const price = Math.ceil(
          Number(priceMatches?.[1].replace(',', '') ?? '0')
        )
        const category = !selectors.category
          ? undefined
          : el
              .querySelector<HTMLElement>(selectors.category)
              ?.textContent?.trim() ?? ''

        return {
          url,
          title,
          category,
          img,
          price,
        }
      })
    },
    selectors
  )

  return items.map((item) => {
    return {
      ...item,
      conbini: conbini.name,
    }
  })
}
