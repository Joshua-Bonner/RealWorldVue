<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import store from '@/store/index.js'
import { computed } from 'vue'

export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const notificationTypeClass = computed(() => {
      return `-text-${props.notification.type}`
    })
    const remove = (id) => store.dispatch('notification/remove', { id })
    const timeout = null
    return {
      notificationTypeClass,
      timeout,
      remove,
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
