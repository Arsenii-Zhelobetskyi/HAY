import { defineStore } from 'pinia'

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cart: []
  }),
  getters: {
    itemsInCart() {
      return this.cart.length
    },

    totalAmount() {
      return this.cart.reduce((acc, item) => acc + item?.amount, 0)
    },
    totalPrice() {
      return this.cart.reduce((acc, item) => acc + item?.price * item?.amount, 0)
    },
    
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
