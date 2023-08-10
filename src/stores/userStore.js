import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: { id: 'abc123', name: 'Joshua' },
  }),
})
