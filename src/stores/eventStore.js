import { defineStore } from 'pinia'
import EventService from '@/services/EventService'
import { useNotificationStore } from './notificationStore'

export const useEventStore = defineStore('event', {
  state: () => ({
    events: [],
    event: {},
    eventsTotal: 0,
    perPage: 4,
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
          useNotificationStore().add(notification)
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message:
              'There was a problem creating your event: ' + error.message,
          }
          useNotificationStore().add(notification)
          throw error
        })
    },
    fetchEvent(id) {
      var event = this.getEventById(id)
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
          useNotificationStore().add(notification)
        })
    },
  },
})
