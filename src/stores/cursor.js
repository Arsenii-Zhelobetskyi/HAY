import { defineStore } from 'pinia'

export const useCursorStore = defineStore('cartStore', {
  state: () => ({
    bigBall: null
  }),
  getters: {
    getBigBall() {
      return this.bigBall
    }
  },
  actions: {
    setBigBall(bigBall) {
      this.bigBall = bigBall
    }
  }
})
