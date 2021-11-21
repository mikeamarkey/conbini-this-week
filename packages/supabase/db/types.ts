import { definitions } from '../generate/api'

export type Item = definitions['items']
export type InsertItem = Omit<Item, 'id' | 'created_at'>

export type ConbiniName = Item['conbini']
