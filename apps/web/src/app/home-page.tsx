import { Content, Footer, Header } from 'components'
import { type ContentProps } from 'components/Content'

export type HomePageProps = {
  items: ContentProps['items']
}

export default function HomePage({ items }: HomePageProps) {
  return (
    <div className="py-9 px-2 sm:px-6">
      <Header itemCount={items.length} />
      <div className="mt-9 pb-3">
        <Content items={items} />
      </div>
      <div className="mt-3 pt-9 px-3 pb-4 border-t border-gray-300">
        <Footer />
      </div>
    </div>
  )
}
