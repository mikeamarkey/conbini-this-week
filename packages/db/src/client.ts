import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { type Database } from './schema'
import { type InsertItem } from './types'

export class Client {
  private client: SupabaseClient<Database>

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
      .from('items')
      .select()
      .gt('created_at', this.getLastWeekTimestamp())
    if (error) {
      throw error
    }
    return data
  }

  public insertItem = async (items: Omit<InsertItem, 'id'>[]) => {
    const { data, error } = await this.client
      .from('items')
      .upsert(items, {
        onConflict: 'img',
      })
      .select()
    if (error) {
      throw error
    }
    return data?.length ?? 0
  }
}
