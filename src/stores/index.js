import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    categories: [
      'Sustainability',
      'Nature',
      'Animal Welfare',
      'Housing',
      'Education',
      'Food',
      'Community',
    ],
  }),
})
