<template>
  <div class="notification-bar" :class="notificationTypeClass">
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
    const remove = (id) => {
      notificationStore.remove(id)
    }
    const notificationTypeClass = computed(() => {
      return `-text-${props.notification.type}`
    })
    const timeout = null
    return {
      remove,
      notificationTypeClass,
      timeout,
    }
  },
  mounted() {
    this.timeout = setTimeout(() => {
      this.remove(this.notification.id)
    }, 5000)
  },
  beforeUnmount() {
    clearTimeout(this.timeout)
  },
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
