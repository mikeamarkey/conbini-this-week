import { chromium } from 'playwright-chromium'

import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto('https://www.family.co.jp/goods/newgoods/nextweek.html')
    const items = await page.$$eval(
      '.ly-goods-list-area .ly-mod-layout-clm',
      (els) => {
        return els.map((el) => {
          const href = el
            .querySelector('.ly-mod-infoset4-link')
            .getAttribute('href')
            .trim()
          const title = el
            .querySelector('.ly-mod-infoset4-ttl')
            .textContent.trim()
          const category = el
            .querySelector('.ly-mod-infoset4-cate')
            .textContent.trim()
          const imgUrl = el
            .querySelector('.ly-mod-infoset4-img')
            .getAttribute('src')
          const hasPrice = el
            .querySelector('.ly-mod-infoset4-txt')
            .textContent.match(/税込\d+円/)
          const price = hasPrice && hasPrice[1] ? hasPrice[1] : ''

          return {
            href,
            title,
            category,
            imgUrl,
            price,
          }
        })
      }
    )
    await await browser.close()
    res.status(200).json(items)
  } catch (e) {
    res.status(200).json(e)
  }
}

export default handler
