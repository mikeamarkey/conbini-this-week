'use client'

import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
} from 'react'
import { useDebounce } from 'react-use'
import { type ConbiniName, conbiniNames } from '~/core'
import { ConbiniLogo } from 'components'

export type ControlsProps = {
  setConbiniFilter: Dispatch<SetStateAction<ConbiniName | undefined>>
  setTextFilter: Dispatch<SetStateAction<string>>
}

export default function Controls({
  setConbiniFilter,
  setTextFilter,
}: ControlsProps) {
  const [search, setSearch] = useState('')
  const [activeConbini, setActiveConbini] = useState<ConbiniName | undefined>(
    undefined
  )

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  const handleConbiniClick = useCallback(
    (conbiniName: ConbiniName) => {
      if (activeConbini === conbiniName) {
        setActiveConbini(undefined)
      } else {
        setActiveConbini(conbiniName)
      }
    },
    [activeConbini]
  )

  useDebounce(
    () => {
      setTextFilter(search)
    },
    200,
    [search]
  )

  useDebounce(
    () => {
      setConbiniFilter(activeConbini)
    },
    50,
    [activeConbini]
  )

  return (
    <div className="m-auto max-w-lg">
      <input
        className="w-full rounded-xl border-2 border-gray-300 py-2 px-4 outline-none transition-colors hover:border-gray-900 focus:border-gray-900 active:border-gray-900"
        type="search"
        aria-label="search"
        onChange={handleSearchChange}
        placeholder="Search for items..."
      />
      <div className="mt-2 flex flex-wrap items-center justify-center">
        {conbiniNames.map((conbiniName) => (
          <button
            className={`m-2 overflow-hidden rounded-full border-4 bg-transparent p-0 hover:opacity-90 ${
              activeConbini === conbiniName
                ? 'border-pink-500'
                : 'border-gray-300'
            }`}
            key={conbiniName}
            onClick={() => handleConbiniClick(conbiniName)}
          >
            <ConbiniLogo conbiniName={conbiniName} size={48} />
          </button>
        ))}
      </div>
    </div>
  )
}
