import { type Item } from '~/db'
import { type ItemListProps } from 'components/ItemList'

export const resolveItem = (item: Item): ItemListProps['items'][number] => {
  const { conbini, ...restItem } = item
  return {
    ...restItem,
    conbiniName: conbini,
  }
}

export const resolveItems = (items: Item[]): ItemListProps['items'] => {
  return items.map(resolveItem)
}
