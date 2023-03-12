'use client'

import Image from 'next/image'
import { type ComponentProps, useState } from 'react'

export type ImageWithFallbackProps = ComponentProps<typeof Image>

export default function ImageWithFallback({
  src: originalSrc,
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [src, setSrc] = useState(originalSrc)

  return (
    <Image
      {...props}
      onError={() => setSrc('/not-found.jpg')}
      alt={alt}
      src={src}
    />
  )
}
