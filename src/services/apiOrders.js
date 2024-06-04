import supabase from './supabase'

import { getCurrentUser } from '@/services/apiAuth.js'
import { getProduct } from '@/services/apiProducts.js'

export async function addOrder(product_id,quantity,price){
  const user = await getCurrentUser();
  const product = await getProduct(product_id)

  const { data, error } = await supabase.from('orders')
    .insert([{
      user_id: user.id,
      product_id:product.id,
      products_bought:quantity,
      total_price:price
    }])
    .select();

  if (error)
  {
    throw new Error('Insert error');
  }

  return data;
}

export async function getOrders() {
  const user = await getCurrentUser();

  const { data: orders, error } = await supabase.from('orders')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    throw new Error('Fetch error');
  }

  // Додаємо підсумкову ціну для кожного замовлення
  const ordersWithTotalPrice = await Promise.all(orders.map(async (order) => {
    const product = await getProduct(order.product_id);
    const totalPrice = product.price * order.products_bought;
    return { ...order, total_price: totalPrice };
  }));

  return ordersWithTotalPrice;
}