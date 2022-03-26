import type { Item } from '@conbini-this-week/db/types'
import { Card, Divider, Image, styled, Text } from '@nextui-org/react'

type Props = {
  items: Item[]
}

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

export default function ConbiniList({ items }: Props) {
  return (
    <>
      <Text size="$sm" weight="bold">
        New Items: {items.length}
      </Text>
      <List>
        {items.map((item) => (
          <StyledAnchor
            key={item.url}
            href={item.url}
            target="__blank"
            rel="noopener noreferrer"
          >
            <StyledCard shadow hoverable>
              <Image src={item.img} alt={item.title} />
              <Text weight="bold">{item.title}</Text>
              <Card.Footer>
                <Text size="sm" weight="bold">
                  {new Intl.NumberFormat('ja-JP', {
                    style: 'currency',
                    currency: 'JPY',
                  }).format(item.price)}
                </Text>
              </Card.Footer>
            </StyledCard>
          </StyledAnchor>
        ))}
      </List>
    </>
  )
}
