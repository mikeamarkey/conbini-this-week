import { Card, Grid, Text } from '@nextui-org/react'
import Image from 'next/image'
import { ComponentProps, useState } from 'react'
import { ConbiniName, conbinisMap } from '~/core'
import { Box, ConbiniLogo, Link } from 'components'
import { formatCurrency } from 'utils/number'

export type ItemListProps = {
  conbiniFilter?: ConbiniName
  itemCount: number
  items: {
    conbiniName: ConbiniName
    id: number
    img: string
    price: number
    title: string
    url: string
  }[]
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

  return `Currently showing ${filteredItemsCount} items from ${conbinisMap[conbiniFilter].name}`
}

const ImageWithFallback = ({
  src: originalSrc,
  alt,
  ...props
}: ComponentProps<typeof Image>) => {
  const [src, setSrc] = useState(originalSrc)

  return (
    <Image
      {...props}
      onError={() => setSrc('/not-found.jpg')}
      alt={alt}
      src={src}
    />
  )
}

export default function ItemList({
  conbiniFilter,
  items,
  itemCount,
}: ItemListProps) {
  const itemCountText = getItemCountText(items.length, itemCount, conbiniFilter)

  return (
    <>
      <Text css={{ textAlign: 'center', margin: 0 }}>{itemCountText}</Text>

      {items.length > 0 && (
        <Grid.Container gap={1} css={{ marginTop: '$sm' }}>
          {items.map((item) => (
            <Grid key={item.id} xs={6} sm={3} md={2.4}>
              <Link
                href={item.url}
                target="__blank"
                rel="noopener noreferrer"
                css={{ width: '100%', height: '100%' }}
              >
                <Card css={{ height: '100%' }} isPressable variant="bordered">
                  <Box
                    css={{
                      position: 'relative',
                      aspectRatio: '6 / 5',
                    }}
                  >
                    <ImageWithFallback
                      src={item.img}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="480px"
                    />
                  </Box>
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
                      <ConbiniLogo size={24} conbiniName={item.conbiniName} />
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
