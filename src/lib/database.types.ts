export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      site_content: {
        Row: {
          id: string
          section: string
          key: string
          value: string
          type: string
          updated_at: string
        }
        Insert: {
          id?: string
          section: string
          key: string
          value: string
          type?: string
          updated_at?: string
        }
        Update: {
          id?: string
          section?: string
          key?: string
          value?: string
          type?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          icon: string
          order_index: number
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          icon: string
          order_index?: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          icon?: string
          order_index?: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      gallery: {
        Row: {
          id: string
          image_url: string
          title: string
          category: string
          order_index: number
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          image_url: string
          title: string
          category: string
          order_index?: number
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          image_url?: string
          title?: string
          category?: string
          order_index?: number
          active?: boolean
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          client_name: string
          client_company: string
          testimonial: string
          rating: number
          image_url: string
          order_index: number
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          client_name: string
          client_company?: string
          testimonial: string
          rating?: number
          image_url?: string
          order_index?: number
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          client_name?: string
          client_company?: string
          testimonial?: string
          rating?: number
          image_url?: string
          order_index?: number
          active?: boolean
          created_at?: string
        }
      }
    }
  }
}
