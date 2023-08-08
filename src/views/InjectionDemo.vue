<template>
  <span v-html="template"></span>
</template>
<script>
import EventService from '@/services/EventService'
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const template = ref(null)

    onMounted(() => {
      return EventService.getInjectedTemplate().then((response) => {
        template.value = response.data.template
      })
    })

    return { template }
  },
}
</script>
<style></style>
