import Head from 'next/head'
import ItemList from '../components/ItemList'
import type { Item } from '@conbini-this-week/db/types'
import { Client } from '@conbini-this-week/db'
import { apiUrl, publicKey } from '../constants'
import { Container, styled, Text } from '@nextui-org/react'

type Props = {
  items: Item[]
}

const Header = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const Content = styled('div', {
  [`${Header} + &`]: {
    marginTop: '32px',
  },
})

export function Home({ items }: Props) {
  return (
    <>
      <Head>
        <title>Conbini Scraper</title>
      </Head>

      <Container fluid>
        <Header>
          <Text h1>{`Conbini This Week`}</Text>
          <Text size="$sm" weight="bold">
            {items.length} new items this week!
          </Text>
        </Header>

        <Content>
          <ItemList items={items} />
        </Content>
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
