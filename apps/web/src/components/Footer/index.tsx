import { Text } from '@nextui-org/react'
import Image from 'next/image'
import { Box, Link } from 'components'
import { repoUrl } from 'constant'

export type FooterProps = never

export default function Footer() {
  return (
    <Box css={{ textAlign: 'center' }}>
      <Link href={repoUrl}>
        <Image
          width={24}
          height={24}
          src="/github.png"
          alt="Conbini This Week"
        />
      </Link>
      <Text size="$sm" css={{ marginTop: '$xs' }}>
        {`This project is made with ❤️ for the conbini.`}
        <br />
        {`All images and text belong to the respective companies.`}
        <br />
        {`(Please don't copyright strike this 🙏)`}
      </Text>
    </Box>
  )
}
