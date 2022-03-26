import type { Item } from '@conbini-this-week/db/types'
import { Controls, ItemList } from 'components'
import { useMemo, useState } from 'react'

type Props = {
  items: Item[]
}

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
    <>
      <Controls setFilter={setFilter} />
      <ItemList itemCount={items.length} filteredItems={filteredItems} />
    </>
  )
}
