import supabase from './supabase'

export async function getCatalog() {
  const { data, error } = await supabase.from('products').select('*')
  if (error) {
    console.log('Error fetching products', error.message)
    throw new Error(error.message)
  }
  console.log(data)
  return data
}
