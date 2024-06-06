import { defineStore } from 'pinia'

export const useContactStore = defineStore('contactStore', {
  state: () => ({
    mapCenter: null
  }),
  getters: {
    getMapCenter() {
      return this.mapCenter
    }
  },
  actions: {
    setMapCenter(center) {
      this.mapCenter = center
    }
  }
})
