<template>
  <div
    class="notification-bar"
    :class="notificationTypeClass"
  >
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notificationStore.js'

export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const notificationStore = useNotificationStore()
    const notificationTypeClass = computed(() => {
      return `-text-${props.notification.type}`
    })

    return {
      notificationTypeClass,
      notificationStore,
    }
  },
  mounted() {
    setTimeout(() => {
      this.notificationStore.remove(this.notification.id)
    }, 5000)
  },
  unmounted() {
    clearTimeout()
  },
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
