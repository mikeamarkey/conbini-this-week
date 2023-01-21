import { Image } from '@nextui-org/react'
import type { ConbiniName } from '@conbini-this-week/core'

export type ConbiniLogoProps = {
  conbiniName: ConbiniName
  size: number
}

export default function ConbiniLogo({ conbiniName, size }: ConbiniLogoProps) {
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
