import { Card, Grid, Text } from '@nextui-org/react'
import { Item } from '@conbini-this-week/db/types'
import { ConbiniLogo, Link } from 'components'
import { formatCurrency } from 'utils/number'
import Image from 'next/image'

type Props = {
  filteredItems: Item[]
  itemCount: number
}

function getItemCountText(filteredItemsCount: number, itemCount: number) {
  if (filteredItemsCount === itemCount) {
    return 'all'
  }

  return `${filteredItemsCount} of ${itemCount}`
}

export default function ItemList({ filteredItems, itemCount }: Props) {
  const itemCountText = getItemCountText(filteredItems.length, itemCount)

  return (
    <>
      <Text css={{ textAlign: 'center', margin: 0 }}>
        Currently showing {itemCountText} items
      </Text>

      <Grid.Container gap={1} css={{ marginTop: '$sm' }}>
        {filteredItems.map((item) => (
          <Grid key={item.url} xs={6} sm={3} md={2.4}>
            <Link
              href={item.url}
              target="__blank"
              rel="noopener noreferrer"
              css={{ width: '100%', height: '100%' }}
            >
              <Card css={{ height: '100%' }} isPressable variant="bordered">
                <Image
                  src={item.img}
                  alt={item.title}
                  width="480px"
                  height="400px"
                  objectFit="cover"
                />
                <Card.Body css={{ paddingBottom: '$xs' }}>
                  <Text weight="bold">{item.title}</Text>
                </Card.Body>
                <Card.Footer
                  css={{ justifyContent: 'space-between', paddingTop: '$xs' }}
                >
                  <Text size="$md" weight="bold">
                    {formatCurrency(item.price)}
                  </Text>
                  <ConbiniLogo size={24} conbiniName={item.conbini} />
                </Card.Footer>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid.Container>
    </>
  )
}
