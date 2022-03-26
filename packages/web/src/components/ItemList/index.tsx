import type { Item } from '@conbini-this-week/db/types'
import {
  Card,
  FormElement,
  Image,
  Input,
  styled,
  Text,
} from '@nextui-org/react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useDebounce } from 'react-use'

type Props = {
  items: Item[]
}

const Actions = styled('div', {
  maxWidth: '480px',
  margin: 'auto',
  textAlign: 'center',
})

const List = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  paddingBottom: '64px',

  [`${Actions} + &`]: {
    marginTop: '32px',
  },
})

const StyledAnchor = styled('a', {
  width: 'calc(50% - 16px)',
  flexShrink: 0,
  color: 'inherit',
  textDecoration: 'none',
  '@xs': {
    width: 'calc(33% - 16px)',
  },
  '@sm': {
    width: 'calc(25% - 16px)',
  },
  '@md': {
    width: 'calc(20% - 16px)',
  },
})

const StyledCard = styled(Card, {
  height: '100%',
})

export default function ConbiniList({ items }: Props) {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const handleSearchChange = useCallback((e: ChangeEvent<FormElement>) => {
    setSearch(e.target.value)
  }, [])

  useDebounce(
    () => {
      setDebouncedSearch(search)
    },
    300,
    [search]
  )

  const filteredItems = useMemo(() => {
    return items.filter(({ title, conbini }) => {
      return (
        title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        conbini.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    })
  }, [items, debouncedSearch])

  return (
    <>
      <Actions>
        <Input
          aria-label="search"
          onChange={handleSearchChange}
          clearable
          fullWidth
          bordered
          size="lg"
          placeholder="Search for items..."
        />
        <Text css={{ marginTop: '8px' }} size="sm">
          Currently showing {filteredItems.length} items
        </Text>
      </Actions>
      <List>
        {filteredItems.map((item) => (
          <StyledAnchor
            key={item.url}
            href={item.url}
            target="__blank"
            rel="noopener noreferrer"
          >
            <StyledCard shadow hoverable>
              <Image src={item.img} alt={item.title} />
              <Text weight="bold">{item.title}</Text>
              <Card.Footer css={{ justifyContent: 'space-between' }}>
                <Text size="sm" weight="bold">
                  {new Intl.NumberFormat('ja-JP', {
                    style: 'currency',
                    currency: 'JPY',
                  }).format(item.price)}
                </Text>
                <Image
                  containerCss={{ margin: 0 }}
                  width="36px"
                  src={`/${item.conbini}.png`}
                  alt={item.conbini}
                />
              </Card.Footer>
            </StyledCard>
          </StyledAnchor>
        ))}
      </List>
    </>
  )
}
