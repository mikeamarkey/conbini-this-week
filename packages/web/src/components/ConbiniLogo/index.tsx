import type { ConbiniName } from '@conbini-this-week/db/types'
import { Image } from '@nextui-org/react'

type Props = {
  conbiniName: ConbiniName
  size: number
}

export default function ConbiniLogo({ conbiniName, size }: Props) {
  return (
    <Image
      containerCss={{ margin: 0 }}
      width={`${size}px`}
      height={`${size}px`}
      src={`/${conbiniName}.svg`}
      alt={conbiniName}
    />
  )
}
