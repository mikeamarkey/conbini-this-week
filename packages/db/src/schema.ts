export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      items: {
        Row: {
          conbini: Database['public']['Enums']['conbini']
          url: string
          title: string
          img: string
          price: number
          category: string | null
          created_at: string
          id: number
        }
        Insert: {
          conbini: Database['public']['Enums']['conbini']
          url: string
          title: string
          img: string
          price: number
          category?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          conbini?: Database['public']['Enums']['conbini']
          url?: string
          title?: string
          img?: string
          price?: number
          category?: string | null
          created_at?: string
          id?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      conbini: 'familymart' | 'lawson' | 'seveneleven' | 'ministop'
    }
  }
}
