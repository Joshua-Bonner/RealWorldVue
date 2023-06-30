<template>
  <div>
    <h1>Showing Event #{{ id }}</h1>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
}
</script>
<style></style>
