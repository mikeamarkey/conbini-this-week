import Image from 'next/image'
import type { ConbiniName } from '~/core'

export type ConbiniLogoProps = {
  conbiniName: ConbiniName
  size: number
}

export default function ConbiniLogo({ conbiniName, size }: ConbiniLogoProps) {
  return (
    <Image
      width={size}
      height={size}
      src={`/${conbiniName}.svg`}
      alt={conbiniName}
    />
  )
}
