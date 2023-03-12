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
    <div className="max-w-lg m-auto">
      <input
        className="w-full py-2 px-4 border-2 rounded-xl border-gray-300 active:border-gray-900 focus:border-gray-900 hover:border-gray-900 transition-colors"
        type="search"
        aria-label="search"
        onChange={handleSearchChange}
        placeholder="Search for items..."
      />
      <div className="mt-2 flex flex-wrap justify-center items-center">
        {conbiniNames.map((conbiniName) => (
          <button
            className={`p-0 bg-transparent m-2 overflow-hidden rounded-full border-2 hover:opacity-90 ${
              activeConbini === conbiniName
                ? 'border-pink-500'
                : 'border-transparent'
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
