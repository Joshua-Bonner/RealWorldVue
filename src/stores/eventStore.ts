import { defineStore } from 'pinia'
import EventService from '@/services/EventService'
import { notificationStore } from '@/stores/notificationStore'

export const eventStore = defineStore('event', {
  state: () => ({
    events: [],
    event: {},
    eventsTotal: 0,
    perPage: 3,
  }),

  getters: {
    getEventById: (state) => (id) => {
      return state.events.find((event) => event.id === id)
    },
  },

  actions: {
    createEvent(event) {
      return EventService.postEvent(event)
        .then(() => {
          this.events.push(event)
          const notification = {
            type: 'success',
            message: 'Your event has been created!',
          }
          notificationStore().add(notification)
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message:
              'There was a problem creating your event: ' + error.message,
          }
          notificationStore().add(notification)
          throw error
        })
    },
    fetchEvent(id) {
      const event = this.getEventById(id)
      if (event) {
        this.event = event
        return event
      } else {
        return EventService.getEvent(id).then((response) => {
          this.event = response.data
          return response.data
        })
      }
    },
    fetchEvents(page) {
      return EventService.getEvents(this.perPage, page)
        .then((response) => {
          this.events = response.data
          this.eventsTotal = response.headers['x-total-count']
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching events: ' + error.message,
          }
          notificationStore().add(notification)
        })
    },
  },
})
