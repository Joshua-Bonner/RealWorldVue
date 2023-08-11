import { defineStore } from 'pinia'

export const notificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
    nextId: 1,
  }),

  actions: {
    add(notification) {
      this.notifications.push(notification)
      notification.id = this.nextId++
    },
    remove(notificationIdToRemove) {
      this.notifications = this.notifications.filter(
        (notification) => notification.id !== notificationIdToRemove
      )
    },
  },
})
