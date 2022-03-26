import Head from 'next/head'
import ConbiniList from '../components/ConbiniList'
import type { Item } from '@conbini-this-week/db/types'
import { Client } from '@conbini-this-week/db'
import { apiUrl, publicKey } from '../constants'

type Props = {
  items: Item[]
}

export function Home({ items }: Props) {
  return (
    <>
      <Head>
        <title>Conbini Scraper</title>
      </Head>

      <p>{`This week's items`}</p>
      <ConbiniList items={items} />
    </>
  )
}

export async function getStaticProps() {
  const client = new Client(apiUrl, publicKey)
  const items = await client.getItems()

  return {
    props: { items },
    revalidate: 360,
  }
}

export default Home
