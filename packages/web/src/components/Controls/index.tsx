import { FormElement, Input, styled } from '@nextui-org/react'
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react'
import { useDebounce } from 'react-use'

type Props = {
  setFilter: Dispatch<SetStateAction<string>>
}

const Wrapper = styled('div', {
  maxWidth: '480px',
  margin: 'auto',
})

export default function Controls({ setFilter }: Props) {
  const [search, setSearch] = useState('')

  const handleSearchChange = useCallback((e: ChangeEvent<FormElement>) => {
    setSearch(e.target.value)
  }, [])

  useDebounce(
    () => {
      setFilter(search)
    },
    200,
    [search]
  )

  return (
    <Wrapper>
      <Input
        aria-label="search"
        onChange={handleSearchChange}
        clearable
        fullWidth
        bordered
        size="lg"
        placeholder="Search for items..."
      />
    </Wrapper>
  )
}
