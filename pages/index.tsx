import Head from 'next/head'
import ConbiniList from '../components/ConbiniList'
// import { scrape } from '../scraper'
import { ConbiniItem } from '../scraper/types'

type Props = {
  items: ConbiniItem[]
}

export const Home = ({ items }: Props) => (
  <>
    <Head>
      <title>Conbini Scraper</title>
    </Head>

    <ConbiniList items={items} />
  </>
)

export async function getStaticProps() {
  // const items = await scrape('familymart')
  const items = [] as ConbiniItem[]

  return {
    props: { items },
    revalidate: 360,
  }
}

export default Home
