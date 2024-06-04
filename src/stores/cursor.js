import { defineStore } from 'pinia'

export const useCursorStore = defineStore('cursorStore', {
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
