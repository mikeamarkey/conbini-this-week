'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ConbiniName } from '~/core'
import { Controls, ItemList } from 'components'
import type { ItemListProps } from 'components/ItemList'

export type ContentProps = {
  items: ItemListProps['items']
}

const defaultVisibleItemCount = 30

export default function Content({ items }: ContentProps) {
  const [conbiniFilter, setConbiniFilter] = useState<ConbiniName | undefined>(
    undefined
  )
  const [textFilter, setTextFilter] = useState('')
  const [visibleItemCount, setVisibleItemCount] = useState(
    defaultVisibleItemCount
  )
  const visibleItemCountIntervalRef = useRef<ReturnType<
    typeof setInterval
  > | null>(null)

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

  const totalItemsCount = items.length

  useEffect(() => {
    visibleItemCountIntervalRef.current = setInterval(() => {
      if (visibleItemCount < totalItemsCount) {
        setVisibleItemCount(
          (currentVisibleItemCount) =>
            currentVisibleItemCount + defaultVisibleItemCount
        )
      } else {
        if (visibleItemCountIntervalRef.current) {
          clearInterval(visibleItemCountIntervalRef.current)
        }
      }
    }, 100)

    return () => {
      if (visibleItemCountIntervalRef.current) {
        clearInterval(visibleItemCountIntervalRef.current)
      }
    }
  }, [totalItemsCount, visibleItemCount])

  return (
    <>
      <Controls
        setConbiniFilter={setConbiniFilter}
        setTextFilter={setTextFilter}
      />
      <div className="mt-5">
        <ItemList
          conbiniFilter={conbiniFilter}
          itemCount={totalItemsCount}
          visibleItemCount={visibleItemCount}
          items={filteredItems}
        />
      </div>
    </>
  )
}
