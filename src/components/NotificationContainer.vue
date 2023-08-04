<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>
<script>
import NotificationBar from '@/components/NotificationBar.vue'
import { useNotificationStore } from '@/stores/notificationStore.js'

export default {
  components: {
    NotificationBar,
  },
  setup() {
    const notificationStore = useNotificationStore()
    return {
      notifications: notificationStore.notifications,
    }
  },
}
</script>
<style scoped>
.notification-container {
  position: fixed;
  bottom: 0;
  right: 0;
  padding-right: 40px;
}
</style>
