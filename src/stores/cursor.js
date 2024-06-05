import { defineStore } from 'pinia'

export const useCursorStore = defineStore('cursorStore', {
  state: () => ({
    cursor: null,
    smallBall: null,
    bigBall: null
  }),
  getters: {
    getCursor() {
      return this.cursor
    },
    getSmallBall() {
      return this.smallBall
    },
    getBigBall() {
      return this.bigBall
    }
  },
  actions: {
    setBigBall(cursor, smallBall, bigBall) {
      this.cursor = cursor
      this.smallBall = smallBall
      this.bigBall = bigBall
    }
  }
})
