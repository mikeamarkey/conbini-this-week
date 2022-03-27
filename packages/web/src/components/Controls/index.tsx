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

const conbinis: ConbiniName[] = ['lawson', 'familymart', 'seveneleven']

type Props = {
  setConbiniFilter: Dispatch<SetStateAction<ConbiniName | undefined>>
  setTextFilter: Dispatch<SetStateAction<string>>
}

const Wrapper = styled('div', {
  maxWidth: '480px',
  margin: 'auto',
})

const ClickableDiv = styled('div', {
  cursor: 'pointer',
  margin: '$xs',
  padding: '$xs',
  borderRadius: '$pill',
  border: '2px solid $accents2',

  '&:hover': {
    backgroundColor: '$accents1',
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
        css={{ marginTop: '$xs', display: 'flex', justifyContent: 'center' }}
      >
        {conbinis.map((conbini) => (
          <ClickableDiv
            key={conbini}
            onClick={() => handleConbiniClick(conbini)}
            css={activeConbini === conbini ? activeStyles : {}}
          >
            <ConbiniLogo conbiniName={conbini} size={30} />
          </ClickableDiv>
        ))}
      </Box>
    </Wrapper>
  )
}
