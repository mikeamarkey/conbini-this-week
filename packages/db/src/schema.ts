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
          category: string | null
          conbini: Database["public"]["Enums"]["conbini"]
          created_at: string
          id: number
          img: string
          price: number
          title: string
          url: string
        }
        Insert: {
          category?: string | null
          conbini: Database["public"]["Enums"]["conbini"]
          created_at?: string
          id?: number
          img: string
          price: number
          title: string
          url: string
        }
        Update: {
          category?: string | null
          conbini?: Database["public"]["Enums"]["conbini"]
          created_at?: string
          id?: number
          img?: string
          price?: number
          title?: string
          url?: string
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
      conbini:
        | "familymart"
        | "lawson"
        | "seveneleven"
        | "ministop"
        | "dailyyamazaki"
    }
  }
}
