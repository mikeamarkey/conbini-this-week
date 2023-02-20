'use client'

import { Container } from '@nextui-org/react'
import { Box, Content, Footer, Header } from 'components'
import { type ContentProps } from 'components/Content'

export type HomePageProps = {
  items: ContentProps['items']
}

export default function HomePage({ items }: HomePageProps) {
  return (
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
      <Box css={{ marginTop: '$xl', paddingBottom: '$md' }}>
        <Content items={items} />
      </Box>
      <Box
        css={{
          marginTop: '$sm',
          padding: '$xl $sm $md',
          borderTop: '1px solid $border',
        }}
      >
        <Footer />
      </Box>
    </Container>
  )
}
