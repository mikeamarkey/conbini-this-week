import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react'
import { FormElement, Input, styled } from '@nextui-org/react'
import { useDebounce } from 'react-use'
import { ConbiniName } from '@conbini-this-week/db/types'
import { Box, ConbiniLogo } from 'components'
import { conbinis } from 'constant'

const conbiniKeys = Object.keys(conbinis) as [keyof typeof conbinis]

type Props = {
  setConbiniFilter: Dispatch<SetStateAction<ConbiniName | undefined>>
  setTextFilter: Dispatch<SetStateAction<string>>
}

const Wrapper = styled('div', {
  maxWidth: '480px',
  margin: 'auto',
})

const LogoButton = styled('button', {
  padding: 0,
  backgroundColor: 'transparent',
  margin: '$xs',
  overflow: 'hidden',
  borderRadius: '$pill',
  border: '2px solid $accents2',
  cursor: 'pointer',

  '&:hover': {
    opacity: '.9',
  },
})

const activeStyles = {
  borderColor: '$pink500',
}

export default function Controls({ setConbiniFilter, setTextFilter }: Props) {
  const [search, setSearch] = useState('')
  const [activeConbini, setActiveConbini] = useState<ConbiniName | undefined>(
    undefined
  )

  const handleSearchChange = useCallback((e: ChangeEvent<FormElement>) => {
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
      <Box
        css={{
          marginTop: '$xs',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {conbiniKeys.map((conbini) => (
          <LogoButton
            key={conbini}
            onClick={() => handleConbiniClick(conbini)}
            css={activeConbini === conbini ? activeStyles : {}}
          >
            <ConbiniLogo conbiniName={conbini} size={48} />
          </LogoButton>
        ))}
      </Box>
    </Wrapper>
  )
}
