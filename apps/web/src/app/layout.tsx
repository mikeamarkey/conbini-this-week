import Providers from './providers'
import './globals.css'

export const metadata = {
  title: 'Conbini This Week',
  description: `See what's coming up this week at the conbini`,
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏪</text></svg>',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja-jp">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
