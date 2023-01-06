import type { ConbiniName, Item } from '@conbini-this-week/db/types'
import { Box, Controls, ItemList } from 'components'
import { useMemo, useState } from 'react'

type Props = {
  items: Item[]
}

export default function Content({ items }: Props) {
  const [conbiniFilter, setConbiniFilter] = useState<ConbiniName | undefined>(
    undefined
  )
  const [textFilter, setTextFilter] = useState('')

  const filteredItems = useMemo(() => {
    return items.filter(({ title, conbini }) => {
      if (conbiniFilter && conbini !== conbiniFilter) {
        return false
      }

      if (textFilter) {
        return (
          title.toLowerCase().includes(textFilter.toLowerCase()) ||
          conbini.toLowerCase().includes(textFilter.toLowerCase())
        )
      }

      return true
    })
  }, [conbiniFilter, items, textFilter])

  return (
    <>
      <Controls
        setConbiniFilter={setConbiniFilter}
        setTextFilter={setTextFilter}
      />
      <Box css={{ marginTop: '$lg' }}>
        <ItemList
          itemCount={items.length}
          conbiniFilter={conbiniFilter}
          filteredItems={filteredItems}
        />
      </Box>
    </>
  )
}
