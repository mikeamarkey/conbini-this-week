import { Client } from '~/db'
import HomePage from './home-page'
import { apiUrl, publicKey } from 'constant'
import { resolveItems } from 'resolvers/item'

async function getItems() {
  const client = new Client(apiUrl, publicKey)
  const items = await client.getItems()
  const resolvedItems = resolveItems(items).slice(0, 5)
  return resolvedItems
}

export default async function Page() {
  const items = await getItems()
  return <HomePage items={items} />
}
