import { defineStore } from 'pinia'

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cart: [
      {
        category_id: 1,
        created_at: '2024-04-22T18:55:15.927511+00:00',
        desc: 'it is a very comfortable chair. It is made for you!',
        id: 'c1b86344-c644-4eea-8eb5-3c9da38a04b5',
        image:
          'https://yuywtsaoxolphscumfdz.supabase.co/storage/v1/object/public/product-images/danny-feng-0806RuKr8gM-unsplash.jpg',
        name: 'very cool chair',
        price: 1200,
        quantity: 3,
        amount: 1
      }
    ]
  }),
  getters: {
    totalAmount() {
      return this.cart.reduce((acc, item) => acc + item?.amount, 0)
    },
    totalPrice() {
      return this.cart.reduce((acc, item) => acc + item?.price * item?.amount, 0)
    }
  },
  actions: {
    addToCart(item) {
      this.cart.push({ ...item, amount: 1 })
    },
    deleteFromCart(id) {
      this.cart = this.cart.filter((item) => item.id !== id)
    },
    clearTheCart() {
      this.cart = []
    },
    addAmount(id, amount) {
      const item = this.cart.find((item) => item.id === id)
      item.amount = amount
    },
    deleteAmount(id, amount) {
      const item = this.cart.find((item) => item.id === id)
      item.amount = amount
    }
  }
})
