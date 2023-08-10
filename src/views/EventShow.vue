<template>
  <div>
    <v-container class="pa-lg-0">
      <v-sheet class="pa-lg-3 ma-lg-auto" elevation="24" rounded>
        <v-row class="py-lg-3">
          <v-col>
            <h1 class="title">{{ event.title }}</h1>
            <span class="eyebrow">@{{ time }} on {{ date }}</span>
          </v-col>
        </v-row>
        <v-divider></v-divider>

        <v-row class="py-lg-3">
          <v-col>
            <h5>
              Organized by: {{ event.organizer ? event.organizer.name : '' }}
            </h5>
            <h5>Category: {{ event.category }}</h5>
          </v-col>
        </v-row>
        <v-divider></v-divider>

        <v-row class="py-lg-2">
          <v-col>
            <h2>Event details</h2>
            <p>{{ event.description }}</p>
          </v-col>
        </v-row>
        <v-divider></v-divider>

        <v-row class="py-lg-2">
          <v-col>
            <h2>Location</h2>
            <BaseIcon name="map"
              ><address>{{ event.location }}</address></BaseIcon
            >
          </v-col>
        </v-row>
        <v-divider></v-divider>

        <h2>
          Attendees
          <span class="badge -fill-gradient">{{
            event.attendees ? event.attendees.length : 0
          }}</span>
        </h2>
        <ul class="list-group">
          <li
            v-for="(attendee, index) in event.attendees"
            :key="index"
            class="list-item"
          >
            <b>{{ attendee.name }}</b>
          </li>
        </ul>
      </v-sheet>
    </v-container>
  </div>
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
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.title {
  font-size: 40px;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
