import { SupabaseClient, createClient } from '@supabase/supabase-js'
import type { Item, InsertItem } from './types'

export class Client {
  private client: SupabaseClient

  public constructor(url: string, key: string) {
    this.client = createClient(url, key)
  }

  private getLastWeekTimestamp = () => {
    const now = new Date()
    const nextWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 7
    )
    return nextWeek.toISOString()
  }

  public getItems = async () => {
    const { data, error } = await this.client
      .from<Item>('items')
      .select()
      .gt('created_at', this.getLastWeekTimestamp())
    if (error) {
      throw error
    }
    return data
  }

  public insertItem = async (items: InsertItem[]) => {
    const { data, error } = await this.client
      .from<InsertItem>('items')
      .upsert(items, {
        onConflict: 'url',
      })
    if (error) {
      throw error
    }
    return data?.length ?? 0
  }
}
