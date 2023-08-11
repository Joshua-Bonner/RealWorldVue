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
import { notificationStore } from '@/stores/notificationStore'

export default {
  components: {
    NotificationBar,
  },
  setup() {
    const notifications = computed(() => notificationStore().notifications)
    return {
      notifications,
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
