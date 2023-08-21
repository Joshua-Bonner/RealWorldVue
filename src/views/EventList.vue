<template>
  <v-container class="d-flex-column">
    <v-row>
      <v-col>
        <h1>Events for {{ user.name }}</h1>
        <EventCard v-for="event in events" :key="event.id" :event="event" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col align="right">
        <router-link
          v-if="page > 1"
          :to="{ name: 'event-list', query: { page: page - 1 } }"
          rel="prev"
          >Prev Page</router-link
        >
      </v-col>
      <v-col align="center">
        <span v-if="page >= 2 && hasNextPage"> | </span>
      </v-col>
      <v-col align="left">
        <router-link
          v-if="hasNextPage"
          :to="{ name: 'event-list', query: { page: page + 1 } }"
          rel="next"
          >Next Page</router-link
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
import { useEventStore } from '@/stores/eventStore.js'
import { useUserStore } from '@/stores/userStore.js'
import { computed } from 'vue'

function getPageEvents(routeTo, next) {
  const page = parseInt(routeTo.query.page) || 1
  const eventStore = useEventStore()
  eventStore
    .fetchEvents(page)
    .then(() => {
      next()
    })
    .catch(() => {
      next({ name: '404', params: { resource: 'event' } })
    })
}

export default {
  components: {
    EventCard,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const eventStore = useEventStore()
    const events = computed(() => {
      return eventStore.events
    })
    const user = computed(() => {
      return useUserStore().user
    })
    const hasNextPage = computed(() => {
      return eventStore.eventsTotal > props.page * eventStore.perPage
    })

    return { hasNextPage, events, user, eventStore }
  },
}
</script>
