<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
      />

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Title"
        class="field"
      />

      <BaseInput
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Description"
        class="field"
      />

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Location"
        class="field"
      />

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>

      <BaseSelect
        label="Select a time"
        :options="times"
        v-model="event.time"
        class="field"
      />

      <BaseButton type="submit" buttonClass="-fill-gradient">Submit</BaseButton>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    Datepicker,
  },
  setup() {
    const store = useStore()
    const times = ref([])
    const event = ref(createFreshEventObject())

    for (let i = 1; i <= 24; i++) {
      times.value.push(i + ':00')
    }

    const categories = computed(() => {
      return store.state.categories
    })

    function createEvent() {
      NProgress.start()
      store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id },
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          NProgress.done()
        })
    }
    function createFreshEventObject() {
      const user = store.state.user.user
      const id = Math.floor(Math.random() * 10000000)

      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: [],
      }
    }
    return {
      times,
      categories,
      event,
      createEvent,
    }
  },
}
</script>
