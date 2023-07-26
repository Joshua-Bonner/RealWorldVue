<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        v-model="event.category"
        label="Select a category"
        :options="categories"
      />

      <h3>Name & describe your event</h3>
      <BaseInput
        v-model="event.title"
        label="Title"
        type="text"
        placeholder="Title"
        class="field"
      />

      <BaseInput
        v-model="event.description"
        label="Description"
        type="text"
        placeholder="Description"
        class="field"
      />

      <h3>Where is your event?</h3>
      <BaseInput
        v-model="event.location"
        label="Location"
        type="text"
        placeholder="Location"
        class="field"
      />

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <Datepicker v-model="event.date" placeholder="Date" />
      </div>

      <BaseSelect
        v-model="event.time"
        label="Time"
        :options="times"
        class="field"
      />

      <BaseButton type="submit" button-class="-fill-gradient"
        >Submit</BaseButton
      >
    </form>
  </div>
</template>

<script>
import Datepicker from 'vue3-datepicker'
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
    const date = ref(new Date(''))
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
        id,
        user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date,
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
