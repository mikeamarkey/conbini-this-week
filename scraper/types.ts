import { conbinis } from './constants'

export type ConbiniName = keyof typeof conbinis

export type ConbiniItem = {
  conbiniName: ConbiniName
  href: string
  title: string
  category: string
  imgUrl: string
  price: string
}
