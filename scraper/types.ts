import { conbinis } from './constants'

export type ConbiniItem = {
  conbiniName: keyof typeof conbinis
  href: string
  title: string
  category: string
  imgUrl: string
  price: string
}
