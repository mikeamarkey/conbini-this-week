'use client'

import { CssBaseline } from '@nextui-org/react'
import { NextUIProvider } from '@nextui-org/react'
import { useServerInsertedHTML } from 'next/navigation'
import { SSRProvider } from 'react-aria'

export default function Providers({ children }: { children: React.ReactNode }) {
  useServerInsertedHTML(() => {
    return <>{CssBaseline.flush()}</>
  })

  return (
    <SSRProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SSRProvider>
  )
}
