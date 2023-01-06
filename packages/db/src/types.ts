import { definitions } from './api'

export type Item = definitions['items']
export type InsertItem = Omit<Item, 'id' | 'created_at'>

export type ConbiniName = Item['conbini']
