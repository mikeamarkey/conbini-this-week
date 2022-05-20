import Head from 'next/head'
import type { Item } from '@conbini-this-week/db/types'
import { Client } from '@conbini-this-week/db'
import { apiUrl, publicKey } from '../constants'
import { Container } from '@nextui-org/react'
import { Box, Content, Footer, Header } from 'components'

type Props = {
  items: Item[]
}

export function Home({ items }: Props) {
  return (
    <>
      <Head>
        <title>Conbini This Week</title>
      </Head>

      <Container
        fluid
        css={{
          padding: '$xl $xs',
          '@xs': {
            // reset to default padding
            padding: '$xl calc(2 * $sm)',
          },
        }}
      >
        <Header itemCount={items.length} />
        <Box css={{ marginTop: '$xl' }}>
          <Content items={items} />
        </Box>
        <Box
          css={{
            marginTop: '$sm',
            padding: '$md $sm',
            borderTop: '1px solid $border',
          }}
        >
          <Footer />
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
