import { PAGE_SIZE } from '../utils/constants'
import supabase from './supabase'

export async function getProducts({ page, filter }) {
  let query = supabase.from('products').select('*', { count: 'exact' })

  if (page) {
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    query = query.range(from, to)
  }

  if (filter) {
    query = query[filter.method || 'eq'](filter.field, filter.value)
    console.log(filter)
  }

  const { data: products, error, count } = await query

  if (error) {
    console.log('Error fetching products', error.message)
    throw new Error(error.message)
  }
  // console.log(data)
  // console.log(data, count)
  // const result = { data, count }
  console.log(products)
  return { products, count }
}

// export async function getProducts() {
//   const { data, error } = await supabase.from('products').select('*')
//   if (error) {
//     console.log('Error fetching products', error.message)
//     throw new Error(error.message)
//   }

//   return data
// }

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
