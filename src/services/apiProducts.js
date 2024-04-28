import supabase from './supabase'

export async function getProducts() {
  const { data, error } = await supabase.from('products').select('*')
  if (error) {
    console.log('Error fetching products', error.message)
    throw new Error(error.message)
  }

  return data
}

export async function getProduct(id) {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
  if (error) {
    console.log('Error fetching product', error.message)
    throw new Error(error.message)
  }
  return data
}
