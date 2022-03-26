import type { Item } from '@conbini-this-week/db/types'
import { Card, Image, styled, Text } from '@nextui-org/react'
import { Controls } from 'components'
import { useMemo, useState } from 'react'

type Props = {
  items: Item[]
}

const Wrapper = styled('div')

const List = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  paddingBottom: '64px',
})

const StyledAnchor = styled('a', {
  width: 'calc(50% - 16px)',
  flexShrink: 0,
  color: 'inherit',
  textDecoration: 'none',
  '@xs': {
    width: 'calc(33% - 16px)',
  },
  '@sm': {
    width: 'calc(25% - 16px)',
  },
  '@md': {
    width: 'calc(20% - 16px)',
  },
})

const StyledCard = styled(Card, {
  height: '100%',
})

export default function Content({ items }: Props) {
  const [filter, setFilter] = useState('')

  const filteredItems = useMemo(() => {
    return items.filter(({ title, conbini }) => {
      return (
        title.toLowerCase().includes(filter.toLowerCase()) ||
        conbini.toLowerCase().includes(filter.toLowerCase())
      )
    })
  }, [items, filter])

  return (
    <Wrapper>
      <Controls setFilter={setFilter} />
      <Text css={{ marginTop: '8px', textAlign: 'center' }} size="sm">
        Currently showing {filteredItems.length} items
      </Text>
      <List css={{ marginTop: '32px' }}>
        {filteredItems.map((item) => (
          <StyledAnchor
            key={item.url}
            href={item.url}
            target="__blank"
            rel="noopener noreferrer"
          >
            <StyledCard shadow hoverable>
              <Image src={item.img} alt={item.title} />
              <Text weight="bold">{item.title}</Text>
              <Card.Footer css={{ justifyContent: 'space-between' }}>
                <Text size="sm" weight="bold">
                  {new Intl.NumberFormat('ja-JP', {
                    style: 'currency',
                    currency: 'JPY',
                  }).format(item.price)}
                </Text>
                <Image
                  containerCss={{ margin: 0 }}
                  width="36px"
                  src={`/${item.conbini}.png`}
                  alt={item.conbini}
                />
              </Card.Footer>
            </StyledCard>
          </StyledAnchor>
        ))}
      </List>
    </Wrapper>
  )
}
