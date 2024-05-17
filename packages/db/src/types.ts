import type { Database } from './schema'

export type ConbiniName = Database['public']['Enums']['conbini']
export type Item = Database['public']['Tables']['items']['Row']
export type InsertItem = Database['public']['Tables']['items']['Insert']
