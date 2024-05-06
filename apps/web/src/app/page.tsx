import { Client } from '~/db'
import { Content, Footer, Header } from 'components'
import { apiUrl, publicKey } from 'constant'
import { resolveItems } from 'resolvers/item'

async function getItems() {
  const client = new Client(apiUrl, publicKey)
  const items = await client.getItems()
  const resolvedItems = resolveItems(items)
  return resolvedItems
}

export const revalidate = 360

export default async function Page() {
  const items = await getItems()
  return (
    <div className="px-2 py-9 sm:px-6">
      <Header itemCount={items.length} />
      <div className="mt-9 pb-3">
        <Content items={items} />
      </div>
      <div className="mt-3 border-t border-gray-300 px-3 pb-4 pt-9">
        <Footer />
      </div>
    </div>
  )
}
