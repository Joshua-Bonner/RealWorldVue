<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        v-model="event.category"
        label="Select a category"
        :options="categories"
        :class="{ error: v$.event.category.$error }"
        @blur="v$.event.category.$touch"
      />
      <template v-if="v$.event.category.$error">
        <p v-if="v$.event.category.required" class="errorMessage">
          Category is required.
        </p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        v-model="event.title"
        label="Title"
        type="text"
        placeholder="Title"
        class="field"
        :class="{ error: v$.event.title.$error }"
        @blur="v$.event.title.$touch"
      />
      <template v-if="v$.event.title.$error">
        <p v-if="v$.event.title.required" class="errorMessage">
          Title is required.
        </p>
      </template>

      <BaseInput
        v-model="event.description"
        label="Description"
        type="text"
        placeholder="Description"
        class="field"
        :class="{ error: v$.event.description.$error }"
        @blur="v$.event.description.$touch"
      />
      <template v-if="v$.event.description.$error">
        <p v-if="v$.event.description.required" class="errorMessage">
          Description is required.
        </p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        v-model="event.location"
        label="Location"
        type="text"
        placeholder="Location"
        class="field"
        :class="{ error: v$.event.location.$error }"
        @blur="v$.event.location.$touch"
      />
      <template v-if="v$.event.location.$error">
        <p v-if="v$.event.location.required" class="errorMessage">
          Location is required.
        </p>
      </template>

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <Datepicker
          v-model="event.date"
          input-format="MMM dd yyyy"
          placeholder="Date"
          :class="{ error: v$.event.date.$error }"
          @blur="v$.event.date.$touch"
        />
        <template v-if="v$.event.date.$error">
          <p v-if="v$.event.date.required" class="errorMessage">
            Date is required.
          </p>
        </template>
      </div>

      <BaseSelect
        v-model="event.time"
        label="Time"
        :options="times"
        class="field"
        :class="{ error: v$.event.time.$error }"
        @blur="v$.event.time.$touch"
      />
      <template v-if="v$.event.time.$error">
        <p v-if="v$.event.time.required" class="errorMessage">
          Time is required.
        </p>
      </template>

      <BaseButton
        type="submit"
        button-class="-fill-gradient"
        :disabled="v$.$anyError"
        >Submit</BaseButton
      >

      <p v-if="v$.$anyError" class="errorMessage">
        Please fill out the required field(s).
      </p>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vue3-datepicker'
import NProgress from 'nprogress'
import store from '@/store/index.js'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  components: {
    Datepicker,
  },
  setup() {
    const times = ref([])
    const date = ref(new Date())
    const event = ref(createFreshEventObject())
    const router = useRouter()
    const rules = {
      event: {
        category: { required },
        title: { required },
        description: { required },
        location: { required },
        date: { required },
        time: { required },
      },
    }

    for (let i = 1; i <= 24; i++) {
      times.value.push(i + ':00')
    }

    const categories = computed(() => {
      return store.state.categories
    })

    async function createEvent() {
      this.v$.$touch()
      const isFormValid = await this.v$.$validate()
      if (!isFormValid) return
      NProgress.start()
      store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          router.push({
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
      v$: useVuelidate(rules, event, { $lazy: true }),
      times,
      categories,
      event,
      createEvent,
    }
  },
}
</script>
