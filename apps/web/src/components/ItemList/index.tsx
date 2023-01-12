import { Card, Grid, Text } from '@nextui-org/react'
import { ConbiniName, Item } from '@conbini-this-week/db/types'
import { ConbiniLogo, Link, Box } from 'components'
import { formatCurrency } from 'utils/number'
import Image from 'next/image'
import { conbinis } from 'constant'

type Props = {
  filteredItems: Item[]
  itemCount: number
  conbiniFilter?: ConbiniName
}

function getItemCountText(
  filteredItemsCount: number,
  itemCount: number,
  conbiniFilter?: ConbiniName
): string {
  if (itemCount === 0) {
    return 'No new items this week... check back soon!'
  }

  if (filteredItemsCount === 0) {
    return `Couldn't find anything...`
  }

  if (filteredItemsCount === itemCount) {
    return 'Currently showing all items'
  }

  if (!conbiniFilter) {
    return `Currently showing ${filteredItemsCount} of ${itemCount} items`
  }

  return `Currently showing ${filteredItemsCount} items from ${conbinis[conbiniFilter].name}`
}

export default function ItemList({
  conbiniFilter,
  filteredItems,
  itemCount,
}: Props) {
  const itemCountText = getItemCountText(
    filteredItems.length,
    itemCount,
    conbiniFilter
  )

  return (
    <>
      <Text css={{ textAlign: 'center', margin: 0 }}>{itemCountText}</Text>

      {filteredItems.length > 0 && (
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
                    width={480}
                    height={400}
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
                    <Box css={{ overflow: 'hidden', borderRadius: '$pill' }}>
                      <ConbiniLogo size={24} conbiniName={item.conbini} />
                    </Box>
                  </Card.Footer>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid.Container>
      )}
    </>
  )
}
