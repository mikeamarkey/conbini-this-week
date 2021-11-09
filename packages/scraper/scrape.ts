import { chromium, Page } from 'playwright-chromium'
import { conbiniNames, conbinis } from './constants'
import { createClient } from '@supabase/supabase-js'

export async function scrape(conbiniName: string) {
  if (!(conbiniName in conbinis)) {
    throw new Error('This is not a valid combini name.')
  }

  const browser = await chromium.launch()
  const page = await browser.newPage()
  page.on('console', (message) => {
    if (message.type() === 'error') {
      console.error(message)
    }
  })

  let result: any[] = []
  switch (conbiniName) {
    case conbiniNames.FAMILYMART:
      result = await scrapeFamilyMart(page)
      break
  }

  await browser.close()
  return result
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
        const img =
          el.querySelector<HTMLImageElement>('.ly-mod-infoset4-img > img')
            ?.src ?? ''

        const priceMatches = el
          ?.querySelector<HTMLElement>('.ly-mod-infoset4-txt')
          ?.textContent?.match(/税込([\d,]+)円/)
        const price = priceMatches?.[1] ?? ''

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

  const uploadData = items.slice(0, 5).map((item) => {
    return { ...item, conbini: conbiniNames.FAMILYMART }
  })

  const supabase = createClient(
    process.env.SUPABASE_URL ?? '',
    process.env.SUPABASE_KEY ?? ''
  )
  const { data, error } = await supabase.from('items').upsert(uploadData, {
    onConflict: 'href',
  })
  if (error) {
    throw error
  }

  return data ?? []
}
