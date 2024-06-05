import supabase from './supabase'

export async function fullTextSearch(product) {
  const { data, error } = await supabase
    .from('products')
    .select()
    .textSearch('name', `'${product}:*'`)
    .limit(10)

  if (error) {
    throw new Error("Search fail")
  }


  const productsWithImages = await Promise.all(data.map(async (product) => {
    const images = product.images || [];
    const id = product.id

    return { ...product, image: images[0], product_id: id }
  }))

  return productsWithImages;
}

