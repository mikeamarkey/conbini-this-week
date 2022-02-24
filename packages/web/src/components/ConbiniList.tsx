import type { Item } from '@conbini-this-week/db/types'

type Props = {
  items: Item[]
}

export default function ConbiniList({ items }: Props) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.url}>
          <p>url: {item.url}</p>
          <p>title: {item.title}</p>
          <p>category: {item.category}</p>
          <p>price: {item.price}</p>
          {/* <img src={item.img} /> */}
        </li>
      ))}
    </ul>
  )
}
