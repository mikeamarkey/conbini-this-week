import { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}
