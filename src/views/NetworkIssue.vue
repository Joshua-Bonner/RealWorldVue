<template>
  <div>
    <h1>Uh oh!</h1>
    <h3>There was a problem reaching the server.</h3>
    <router-link :to="{ name: 'event-list' }">
      Back to the Home Page
    </router-link>
  </div>
</template>
<script>
export default {}
</script>
<style></style>
