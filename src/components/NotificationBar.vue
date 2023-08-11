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
import { notificationStore } from '@/stores/notificationStore'

export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const notificationS = notificationStore()
    const notificationTypeClass = computed(() => {
      return `-text-${props.notification.type}`
    })

    return {
      notificationTypeClass,
      notificationS,
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
