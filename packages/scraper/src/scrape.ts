import { Client } from '@conbini-this-week/db'
import type { InsertItem } from '@conbini-this-week/db/types'
import type { ConbiniNames } from './types'
import { conbinis, supabaseKey, supabaseUrl } from './constants'
import { JSDOM } from 'jsdom'

export async function scrape(conbiniName: ConbiniNames) {
  const items = await scrapeConbini(conbiniName)
  const client = new Client(supabaseUrl, supabaseKey)
  const count = await client.insertItem(items)
  console.log(`${count} items from ${conbiniName} inserted`)
}

export async function scrapeAll() {
  const promises = Object.keys(conbinis).map((conbiniName) => {
    // TODO: better handling of keys/names
    return scrape(conbiniName as ConbiniNames)
  })
  return Promise.all(promises)
}

async function scrapeConbini(conbiniName: ConbiniNames) {
  const conbini = conbinis[conbiniName]
  switch (conbini.name) {
    case 'lawson': {
      let document = (await JSDOM.fromURL(conbini.listUrl())).window.document
        .documentElement
      const redirectContent = document
        .querySelector('meta[http-equiv="Refresh"]')
        ?.getAttribute('content')
      const redirectPath = redirectContent?.match(/URL=(.*)/)?.[1]
      if (!redirectPath) {
        throw new Error('Failed to get redirect path')
      }
      document = (await JSDOM.fromURL(`${conbini.rootUrl}${redirectPath}`))
        .window.document.documentElement
      const listItems = document.querySelectorAll(conbini.selectors.list)
      const collectedItems = await collectPageItems(listItems, conbini)
      return collectedItems
      return []
    }

    case 'familymart': {
      const document = (await JSDOM.fromURL(conbini.listUrl())).window.document
        .documentElement
      const listItems = await document.querySelectorAll(conbini.selectors.list)
      const collectedItems = await collectPageItems(listItems, conbini)
      return collectedItems
    }

    case 'seveneleven': {
      let document = (await JSDOM.fromURL(conbini.listUrl())).window.document
        .documentElement
      const counter = document.querySelector<HTMLElement>(
        '.pager_ctrl .counter'
      )
      const matches = counter?.textContent?.trim().match(/^(\d+)件/)
      const count = Number(matches?.[1] ?? '1')
      const pageCount = Math.ceil(count / 100)

      const collectedItems: InsertItem[] = []
      for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
        if (pageNum !== 1) {
          document = (await JSDOM.fromURL(conbini.listUrl(pageNum))).window
            .document.documentElement
        }
        const listItems = document.querySelectorAll(conbini.selectors.list)
        const newItems = await collectPageItems(listItems, conbini)
        collectedItems.push(...newItems)
      }
      return collectedItems
    }
  }
}

async function collectPageItems(
  listItems: NodeListOf<Element>,
  conbini: typeof conbinis[keyof typeof conbinis]
): Promise<InsertItem[]> {
  const { selectors } = conbini
  const items = Array.from(listItems, (el) => {
    const url =
      el.querySelector<HTMLAnchorElement>(selectors.url)?.href?.trim() ?? ''
    const title =
      el.querySelector<HTMLElement>(selectors.title)?.textContent?.trim() ?? ''
    const img = selectors.imgDataName
      ? el.querySelector<HTMLImageElement>(selectors.img)?.dataset[
          selectors.imgDataName
        ] ?? ''
      : el.querySelector<HTMLImageElement>(selectors.img)?.src ?? ''
    const priceMatches = el
      ?.querySelector<HTMLElement>(selectors.price)
      ?.textContent?.match(selectors.priceRegex)
    const price = Math.ceil(Number(priceMatches?.[1].replace(',', '') ?? '0'))
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

  return items.map((item) => {
    return {
      ...item,
      conbini: conbini.name,
    }
  })
}
