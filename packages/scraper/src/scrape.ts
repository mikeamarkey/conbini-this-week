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
    case 'lawson':
      count += await scrapeLawson(page)
      break
    case 'seveneleven':
      count += await scrapeSevenEleven(page)
      break
  }

  await browser.close()
  return `${count} items uploaded!`
}

async function scrapeFamilyMart(page: Page) {
  const conbini = conbinis.familymart
  await page.goto(conbini.url())
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
        const price = Number(priceMatches?.[1].replace(',', '') ?? '0')

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

async function scrapeLawson(page: Page) {
  const conbini = conbinis.lawson
  await page.goto(conbini.url(), {
    waitUntil: 'networkidle',
  })
  const items = await page.$$eval(
    '.recommend ul.heightLineParent > li',
    (els) => {
      return els.map((el) => {
        // replace with helpers if possible by injecting into page
        const href =
          el.querySelector<HTMLAnchorElement>('a')?.href?.trim() ?? ''
        const title =
          el.querySelector<HTMLElement>('.ttl')?.textContent?.trim() ?? ''
        const img = el.querySelector<HTMLImageElement>('.img img')?.src ?? ''

        const priceMatches = el
          ?.querySelector<HTMLElement>('.price')
          ?.textContent?.match(/([\d,]+)円/)
        const price = Number(priceMatches?.[1].replace(',', '') ?? '0')

        return {
          href,
          title,
          img,
          price,
        }
      })
    }
  )

  const uploadData: InsertItem[] = items.slice(0, 5).map((item) => {
    return { ...item, conbini: 'lawson' }
  })

  const client = new Client(supabaseUrl, supabaseKey)
  const uploadCount = client.insertItem(uploadData)
  return uploadCount
}

async function scrapeSevenEleven(page: Page) {
  const conbini = conbinis.seveneleven
  await page.goto(conbini.url())

  const pageCount = await page.$eval(
    '.pager_ctrl .counter',
    (el: HTMLElement) => {
      const matches = el.innerText.trim().match(/^(\d+)件/)
      const count = Number(matches?.[1] ?? '1')
      return Math.ceil(count / 100)
    }
  )

  let collectedItems: {
    href: string
    title: string
    img: string
    price: number
  }[] = []

  for (let i = 1; i <= pageCount; i++) {
    if (i !== 1) {
      await page.goto(conbini.url(i))
    }

    const newItems = await page.$$eval(
      '.pbMainArea .pbNested .pbNestedWrapper .list_inner',
      (els) => {
        return els.map((el) => {
          // replace with helpers if possible by injecting into page
          const href =
            el.querySelector<HTMLAnchorElement>('a')?.href?.trim() ?? ''
          const title =
            el
              .querySelector<HTMLElement>('.detail .item_ttl')
              ?.textContent?.trim() ?? ''
          const img =
            el.querySelector<HTMLImageElement>('a > img')?.dataset.original ??
            ''

          const priceMatches = el
            ?.querySelector<HTMLElement>('.detail .item_price')
            ?.textContent?.match(/税込([\d,.]+)円/)
          const price = Math.ceil(
            Number(priceMatches?.[1].replace(',', '') ?? '0')
          )

          return {
            href,
            title,
            img,
            price,
          }
        })
      }
    )

    collectedItems = [...collectedItems, ...newItems]
  }

  const uploadData: InsertItem[] = collectedItems.slice(0, 5).map((item) => {
    return { ...item, conbini: 'seveneleven' }
  })

  const client = new Client(supabaseUrl, supabaseKey)
  const uploadCount = client.insertItem(uploadData)
  return uploadCount
}
