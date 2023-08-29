<template>
  <div>
    <v-snackbar :class="notificationTypeClass">
      {{ notification.message }}
    </v-snackbar>
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
    }, 2000)
  },
  unmounted() {
    clearTimeout()
  },
}
</script>
