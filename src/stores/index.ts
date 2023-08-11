import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
  }),
})
