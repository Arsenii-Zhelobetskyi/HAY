import supabase from './supabase'
import { PAGE_SIZE } from '../utils/constants'
export async function fullTextSearch(product, categoryId = null) {
  let query = supabase.from('products').select().textSearch('name', `'${product}:*'`)

  if (categoryId) {
    query = query.eq('category', categoryId)
  }

  const { data, error } = await query

  if (error) {
    throw new Error('Search fail')
  }

  const addInformation = await Promise.all(
    data.map(async (product) => {
      const images = product.images || []
      const id = product.id
      const category = product.category

      return { ...product, image: images[0], product_id: id, category_id: category }
    })
  )

  return addInformation
}

export async function fullTextSearchOnStores({ searchQuery, page }) {
  if (!searchQuery) {
    return []
  }
  let query = supabase
    .from('stores')
    .select()
    .or(
      `name.ilike.%${searchQuery}%,address.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%,country.ilike.%${searchQuery}%`
    )
    .limit(10)
  if (page) {
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    query = query.range(from, to)
  }

  const { data, error } = await query
  if (error) {
    throw new Error(error)
  }

  return data
}
