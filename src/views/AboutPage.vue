<template>
  <div>
    <h3>About:</h3>
    <p style="padding: 20px">
      This is a simple app to help a user keep track of their planned events. It
      is built with Vue.js leveraging Vue3 Composition API, Pinia, and Vuetify
      as well as other third party libraries.
    </p>
    <v-divider class="border-opacity-100 py-lg-2" color="success"></v-divider>
    <h3>Purpose:</h3>
    <p style="padding: 20px">
      Given the transition to the new AIDE development environment, our team was
      tasked with training up on the new technologies briefed by the MARS system
      architects. This application demonstrates our ability to leverage and
      apply these new technologies in a real world application.
    </p>
    <v-divider class="border-opacity-100 py-lg-2" color="success"></v-divider>
    <h3>Background:</h3>
    <p style="padding: 20px">
      Initially, this application was a Vue2 project created by the developers
      over at Vue Mastery to use as a teaching tool. We decided to use this
      project as a base to convert to Vue3 in an effort to demonstrate our
      understanding of the transition from the Options API to the Composition
      API.
    </p>
    <v-divider class="border-opacity-100 py-lg-2" color="success"></v-divider>
    <h3>Tech Stack:</h3>
    <v-col
      ><v-row class="pa-lg-2" style="justify-content: center">
        <a class="link" href="https://vuejs.org/guide/introduction.html"
          >Vue3</a
        >
        <a class="link" href="https://pinia.vuejs.org/introduction.html"
          >Pinia</a
        >
        <a
          class="link"
          href="https://vuetifyjs.com/en/introduction/why-vuetify/"
          >Vuetify</a
        >
        <a
          class="link"
          href="https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html"
          >Typescript</a
        >
      </v-row>
    </v-col>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
.link {
  padding: 10px;
  margin: 10px;
}
</style>
