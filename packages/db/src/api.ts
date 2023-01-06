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
      conbini: 'familymart' | 'lawson' | 'seveneleven'
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          id: string
          name: string
          owner: string | null
          created_at: string | null
          updated_at: string | null
          public: boolean | null
        }
        Insert: {
          id: string
          name: string
          owner?: string | null
          created_at?: string | null
          updated_at?: string | null
          public?: boolean | null
        }
        Update: {
          id?: string
          name?: string
          owner?: string | null
          created_at?: string | null
          updated_at?: string | null
          public?: boolean | null
        }
      }
      migrations: {
        Row: {
          id: number
          name: string
          hash: string
          executed_at: string | null
        }
        Insert: {
          id: number
          name: string
          hash: string
          executed_at?: string | null
        }
        Update: {
          id?: number
          name?: string
          hash?: string
          executed_at?: string | null
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          name: string | null
          owner: string | null
          metadata: Json | null
          id: string
          created_at: string | null
          updated_at: string | null
          last_accessed_at: string | null
          path_tokens: string[] | null
        }
        Insert: {
          bucket_id?: string | null
          name?: string | null
          owner?: string | null
          metadata?: Json | null
          id?: string
          created_at?: string | null
          updated_at?: string | null
          last_accessed_at?: string | null
          path_tokens?: string[] | null
        }
        Update: {
          bucket_id?: string | null
          name?: string | null
          owner?: string | null
          metadata?: Json | null
          id?: string
          created_at?: string | null
          updated_at?: string | null
          last_accessed_at?: string | null
          path_tokens?: string[] | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: { name: string }
        Returns: string
      }
      filename: {
        Args: { name: string }
        Returns: string
      }
      foldername: {
        Args: { name: string }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: { size: number; bucket_id: string }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits: number
          levels: number
          offsets: number
          search: string
          sortcolumn: string
          sortorder: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
