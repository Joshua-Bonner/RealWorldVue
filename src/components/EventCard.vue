<template>
  <router-link
    class="event-link"
    :to="{ name: 'event-show', params: { id: event.id } }"
  >
    <v-container class="event-card -shadow">
      <v-row>
        <v-col class="py-1">
          <h4 class="title">{{ event.title }}</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-1">
          <v-icon style="margin-right: 5px">mdi-clock-check-outline</v-icon>
          <span class="eyebrow">{{ time }} on {{ date }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-1">
          <v-icon>mdi-account-group-outline</v-icon>
          <span style="margin-left: 5px">{{ event.attendees.length }}</span>
        </v-col>
      </v-row>
    </v-container>
  </router-link>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const fullDate = new Date(props.event.date)
    const date = fullDate.toDateString()
    const time = fullDate.toLocaleTimeString()
    return {
      date,
      time,
    }
  },
}
</script>

<style scoped>
.event-card {
  padding: 20px;
  width: 75%;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}
.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
