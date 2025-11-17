import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for your database
export type Product = {
  id: string
  sku: string
  name: string
  description: string | null
  price_cents: number
  stock: number
  category: string | null
  images: string[]
  created_at: string
}

export type Order = {
  id: string
  user_id: string | null
  status: string
  total_cents: number
  created_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price_cents: number
}

export type User = {
  id: string
  email: string
  name: string | null
  role: string
  created_at: string
}