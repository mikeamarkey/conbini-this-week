import { styled, Text } from '@nextui-org/react'

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const Title = styled('h1', {
  fontSize: '$4xl',
  '@sm': {
    fontSize: '$5xl',
  },
})

export default function Header({ itemCount }: { itemCount: number }) {
  return (
    <Wrapper>
      <Title>Conbini This Week</Title>
      <Text size="$xl" weight="bold">
        {itemCount} new items this week!
      </Text>
    </Wrapper>
  )
}
