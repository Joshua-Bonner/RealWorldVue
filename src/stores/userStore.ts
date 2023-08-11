import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => ({
    user: { 
      id: 'abc123', 
      name: 'Adam' 
    },
  }),
})
