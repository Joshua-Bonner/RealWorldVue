import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
  }),

  actions: {
    add(notification) {
      this.notifications.push(notification)
    },
    remove(notificationToRemove) {
      this.notifications = this.notifications.filter(
        (notification) => notification.id !== notificationToRemove.id
      )
    },
  },
})
