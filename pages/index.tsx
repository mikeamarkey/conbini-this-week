import Head from 'next/head'
import { scrape } from '../scraper'
import { ConbiniItem } from '../scraper/types'

type Props = {
  items: ConbiniItem[]
}

export const Home = ({ items }: Props) => (
  <>
    <Head>
      <title>Conbini Scraper</title>
    </Head>

    <div>{JSON.stringify(items)}</div>
  </>
)

export async function getStaticProps() {
  const items = await scrape('familymart')

  return {
    props: { items },
    revalidate: 360,
  }
}

export default Home
