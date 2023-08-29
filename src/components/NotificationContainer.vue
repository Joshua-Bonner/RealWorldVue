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
import { computed } from 'vue'
import NotificationBar from '@/components/NotificationBar.vue'
import { useNotificationStore } from '@/stores/notificationStore.js'

export default {
  components: {
    NotificationBar,
  },
  setup() {
    const notificationStore = useNotificationStore()
    const notifications = computed(() => notificationStore.notifications)
    return {
      notifications,
    }
  },
}
</script>
<style scoped>
.notification-container {
  position: fixed;
  bottom: 50px;
}
</style>
