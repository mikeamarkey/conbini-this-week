import { type ConbiniName, conbinisMap } from '~/core'
import { ConbiniLogo, ImageWithFallback, Link } from 'components'
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

  return `Currently showing ${filteredItemsCount} items from ${conbinisMap[conbiniFilter].displayName}`
}

export default function ItemList({
  conbiniFilter,
  items,
  itemCount,
}: ItemListProps) {
  const itemCountText = getItemCountText(items.length, itemCount, conbiniFilter)

  return (
    <>
      <p className="text-center">{itemCountText}</p>

      {items.length > 0 && (
        <div className="mx-auto mt-6 grid max-w-screen-xl grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((item) => (
            <Link
              className="cursor-pointer overflow-hidden rounded-2xl border border-gray-300 outline-0 transition-colors hover:border-gray-900 focus:border-gray-900 active:border-gray-900"
              key={item.id}
              href={item.url}
              target="__blank"
              rel="noopener noreferrer"
            >
              <div className="flex h-full w-full flex-col">
                <div className="relative aspect-6/5">
                  <ImageWithFallback
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="480px"
                  />
                </div>
                <p className="flex flex-grow flex-col px-3 pt-5 pb-2 font-bold">
                  {item.title}
                </p>
                <div className="flex items-center justify-between px-3 pt-2 pb-3">
                  <p className="font-bold">{formatCurrency(item.price)}</p>

                  <div className="overflow-hidden rounded-full">
                    <ConbiniLogo size={24} conbiniName={item.conbiniName} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
