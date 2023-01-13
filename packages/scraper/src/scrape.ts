import { z } from 'zod'
import { Client } from '../../db/src'
import type { InsertItem } from '../../db/src/types'
import { conbinis, supabaseKey, supabaseUrl } from './constant'
import { JSDOM } from 'jsdom'
import type { ConbiniName } from 'types'

export async function scrape(name: ConbiniName) {
  const items = await scrapeConbini(name)
  const client = new Client(supabaseUrl, supabaseKey)
  const count = await client.insertItem(items)
  return count
}

export async function scrapeDry(name: ConbiniName) {
  const items = await scrapeConbini(name)
  console.log(items)
  return items.length
}

export async function scrapeAll() {
  let count = 0
  const promises = Object.keys(conbinis).map(async (name) => {
    const result = await scrape(name as ConbiniName)
    count += result
    return
  })
  await Promise.all(promises)
  return count
}

async function scrapeConbini(name: ConbiniName) {
  const conbini = conbinis[name]
  switch (conbini.name) {
    case 'dailyyamazaki':
    case 'familymart': {
      const document = (await JSDOM.fromURL(conbini.newItemsUrl())).window
        .document.documentElement
      const listItems = document.querySelectorAll(conbini.selectors.list)
      const collectedItems = await collectPageItems(listItems, conbini)
      return collectedItems
    }
    case 'lawson': {
      let document = (await JSDOM.fromURL(conbini.newItemsUrl())).window
        .document.documentElement
      const redirectContent = document
        .querySelector('meta[http-equiv="Refresh"]')
        ?.getAttribute('content')
      const redirectPath = redirectContent?.match(/URL=(.*)/)?.[1]
      if (!redirectPath) {
        throw new Error('Failed to get redirect path')
      }
      document = (await JSDOM.fromURL(`${conbini.baseUrl}${redirectPath}`))
        .window.document.documentElement
      const listItems = document.querySelectorAll(conbini.selectors.list)
      const collectedItems = await collectPageItems(listItems, conbini)
      return collectedItems
    }

    case 'ministop': {
      const response = await fetch(
        'https://www.ministop.co.jp/syohin/js/recommend.json'
      )
      const json = await response.json()
      const schema = z.array(
        z.object({
          link: z.string(),
          new: z.boolean(),
          price: z.string(),
          title: z.string(),
          image: z.string(),
        })
      )
      const result = schema.safeParse(json)
      if (!result.success) {
        return []
      }

      const { baseUrl, selectors, name } = conbini
      const collectedItems = result.data
        .filter((item) => item.new)
        .map((item) => {
          const priceMatches = item.price.match(selectors.priceRegex)
          const price = Math.ceil(
            Number(priceMatches?.[1].replace(',', '') ?? '0')
          )

          return {
            conbini: name,
            url: `${baseUrl}${item.link}`,
            title: item.title,
            img: `${baseUrl}${item.image}`,
            price,
          }
        })
      return collectedItems
    }

    case 'seveneleven': {
      let document = (await JSDOM.fromURL(conbini.newItemsUrl())).window
        .document.documentElement
      const counter = document.querySelector<HTMLElement>(
        '.pager_ctrl .counter'
      )
      const matches = counter?.textContent?.trim().match(/^(\d+)件/)
      const count = Number(matches?.[1] ?? '1')
      const pageCount = Math.ceil(count / 100)

      const collectedItems: InsertItem[] = []
      for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
        if (pageNum !== 1) {
          document = (await JSDOM.fromURL(conbini.newItemsUrl(pageNum))).window
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
  conbini: (typeof conbinis)[keyof typeof conbinis]
): Promise<InsertItem[]> {
  const { selectors } = conbini
  const items = Array.from(listItems, (el) => {
    const url = !selectors.url
      ? conbini.newItemsUrl()
      : el.querySelector<HTMLAnchorElement>(selectors.url)?.href?.trim() ?? ''
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
