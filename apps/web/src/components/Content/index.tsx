import type { ConbiniName } from '~/core'
import { Box, Controls, ItemList } from 'components'
import { ItemListProps } from 'components/ItemList'
import { useMemo, useState } from 'react'

export type ContentProps = {
  items: ItemListProps['items']
}

export default function Content({ items }: ContentProps) {
  const [conbiniFilter, setConbiniFilter] = useState<ConbiniName | undefined>(
    undefined
  )
  const [textFilter, setTextFilter] = useState('')

  const filteredItems = useMemo(() => {
    return items.filter(({ title, conbiniName }) => {
      if (conbiniFilter && conbiniName !== conbiniFilter) {
        return false
      }

      if (textFilter) {
        return (
          title.toLowerCase().includes(textFilter.toLowerCase()) ||
          conbiniName.toLowerCase().includes(textFilter.toLowerCase())
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
          items={filteredItems}
        />
      </Box>
    </>
  )
}
