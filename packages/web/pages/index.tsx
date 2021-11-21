import Head from 'next/head'
import ConbiniList from '../components/ConbiniList'
import { Item } from '../../supabase/db/types'

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
  // const items = await scrape('familymart')
  const items = [] as Item[]

  return {
    props: { items },
    revalidate: 360,
  }
}

export default Home
