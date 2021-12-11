import Head from 'next/head'
import ConbiniList from '../components/ConbiniList'
import type { Item } from '@db/types'
import { Client } from '@db/db'
import { apiUrl, publicKey } from '../constants'

type Props = {
  items: Item[]
}

export const Home = ({ items }: Props) => (
  <>
    <Head>
      <title>Conbini Scraper</title>
    </Head>

    <p>{`This week's items`}</p>
    <ConbiniList items={items} />
  </>
)

export async function getStaticProps() {
  const client = new Client(apiUrl, publicKey)
  const items = await client.getItems()

  return {
    props: { items },
    revalidate: 360,
  }
}

export default Home
