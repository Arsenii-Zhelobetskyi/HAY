import { PAGE_SIZE } from '../utils/constants'
import supabase from './supabase'

export async function getProducts({ page, filter, sortBy }) {
  let query = supabase.from('products').select('*', { count: 'exact' })

  if (page) {
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    query = query.range(from, to)
  }

  if (sortBy) {
    query = query.order(sortBy.field, { ascending: sortBy.direction === 'asc' })
  }

  if (filter) {
    query = query[filter.method || 'eq'](filter.field, filter.value)
  }

  const { data: products, error, count } = await query

  if (error) {
    console.log('Error fetching products', error.message)
    throw new Error(error.message)
  }

  return { products, count }
}

export async function getProduct(id) {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
  if (error) {
    console.log('Error fetching product', error.message)
    throw new Error(error.message)
  }
  return data
}

export async function getCategories() {
  const { data, error } = await supabase.from('product_category').select('*')
  if (error) {
    console.log('Error fetching categories', error.message)
    throw new Error(error.message)
  }
  return data
}

export async function getMaxPrice() {
  const { data, error } = await supabase
    .from('products')
    .select('price')
    .order('price', { ascending: false })
    .limit(1)

  if (error) {
    console.log('Error fetching maxPrice', error.message)
    throw new Error(error.message)
  }
  return data
}

export async function decreaseProductQuantity(id, decAmount) {
  const product = await getProduct(id)
  const newQuantity = product.quantity - decAmount

  if (newQuantity < 0) {
    throw new Error('Negative quantity')
  }

  const { data, error } = await supabase
    .from('products')
    .update({ quantity: newQuantity })
    .eq('id', id)
    .select()

  if (error) {
    throw new Error('Updating error')
  }

  return data
}
