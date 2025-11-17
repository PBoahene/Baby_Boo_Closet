import { supabase } from './supabase'
import type { Product, Order } from './supabase'

// ============================================
// PRODUCTS
// ============================================

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Product[]
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as Product
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single()
  
  if (error) throw error
  return data as Product
}

export async function updateProduct(id: string, updates: Partial<Product>) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as Product
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// ============================================
// ORDERS
// ============================================

export async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        product:products (*)
      )
    `)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function getOrderById(id: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        product:products (*)
      ),
      user:users (*)
    `)
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

export async function createOrder(orderData: {
  user_id?: string
  total_cents: number
  items: Array<{
    product_id: string
    quantity: number
    unit_price_cents: number
  }>
}) {
  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: orderData.user_id,
      total_cents: orderData.total_cents,
      status: 'PENDING'
    })
    .select()
    .single()
  
  if (orderError) throw orderError
  
  // Add order items
  const itemsWithOrderId = orderData.items.map(item => ({
    ...item,
    order_id: order.id
  }))
  
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(itemsWithOrderId)
  
  if (itemsError) throw itemsError
  
  return order
}

export async function updateOrderStatus(id: string, status: string) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// ============================================
// UPLOADS / IMAGES
// ============================================

export async function uploadImage(file: File, folder: string = 'products') {
  const fileExt = file.name.split('.').pop()
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
  
  if (error) throw error
  
  // Get public URL
  const { data: urlData } = supabase.storage
    .from('uploads')
    .getPublicUrl(fileName)
  
  return {
    path: data.path,
    url: urlData.publicUrl
  }
}

export async function deleteImage(path: string) {
  const { error } = await supabase.storage
    .from('uploads')
    .remove([path])
  
  if (error) throw error
}

// ============================================
// AUTHENTICATION
// ============================================

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

export async function signUp(email: string, password: string, name?: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name || email,
        role: 'customer' // default role
      }
    }
  })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export async function isAdmin() {
  const user = await getCurrentUser()
  if (!user) return false
  
  const { data } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()
  
  return data?.role === 'admin'
}