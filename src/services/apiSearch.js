import supabase from './supabase'

export async function fullTextSearch(product, categoryId = null) {
  let query = supabase
    .from('products')
    .select()
    .textSearch('name', `'${product}:*'`)


  if (categoryId) {
    query = query.eq('category', categoryId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error('Search fail');
  }

  const addInformation = await Promise.all(
    data.map(async (product) => {
      const images = product.images || [];
      const id = product.id;
      const category = product.category;

      return { ...product, image: images[0], product_id: id, category_id: category };
    })
  );

  return addInformation;
}
