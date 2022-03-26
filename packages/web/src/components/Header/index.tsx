import { styled, Text } from '@nextui-org/react'

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export default function Header({ itemCount }: { itemCount: number }) {
  return (
    <Wrapper>
      <Text h1>{`Conbini This Week`}</Text>
      <Text size="$sm" weight="bold">
        {itemCount} new items this week!
      </Text>
    </Wrapper>
  )
}
