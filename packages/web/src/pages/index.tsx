import Head from 'next/head'
import type { Item } from '@conbini-this-week/db/types'
import { Client } from '@conbini-this-week/db'
import { apiUrl, publicKey } from '../constants'
import { Container } from '@nextui-org/react'
import { Box, Content, Header } from 'components'

type Props = {
  items: Item[]
}

export function Home({ items }: Props) {
  return (
    <>
      <Head>
        <title>Conbini Scraper</title>
      </Head>

      <Container fluid css={{ paddingTop: '$xl' }}>
        <Header itemCount={items.length} />
        <Box css={{ marginTop: '$xl' }}>
          <Content items={items} />
        </Box>
      </Container>
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
