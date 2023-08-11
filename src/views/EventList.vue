<template>
  <div>
    <h1>Events for {{ user.name }}</h1>
    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"
    />
    <router-link
      v-if="page > 1"
      :to="{ name: 'event-list', query: { page: page - 1 } }"
      rel="prev"
    >
      Prev Page
    </router-link>
    |
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
    >
      Next Page
    </router-link>
  </div>
</template>
<script script lang="ts">
import EventCard from '@/components/EventCard.vue'
import { eventStore } from '@/stores/eventStore'
import { userStore } from '@/stores/userStore'
import { computed } from 'vue'

function getPageEvents(routeTo, next) {
  const page = parseInt(routeTo.query.page) || 1
  const events = eventStore()
  events
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
    const events = computed(() => {
      return eventStore().events
    })
    const user = computed(() => {
      return userStore().user
    })
    const hasNextPage = computed(() => {
      return eventStore().eventsTotal > props.page * eventStore().perPage
    })

    return { hasNextPage, events, user, eventStore }
  },
}
</script>
