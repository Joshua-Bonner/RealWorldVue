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

      <p
        v-if="v$.event.category.$error"
        class="errorMessage"
      >
        Category is required.
      </p>

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

      <p
        v-if="v$.event.title.$error"
        class="errorMessage"
      >
        Title is required.
      </p>

      <BaseInput
        v-model="event.description"
        label="Description"
        type="text"
        placeholder="Description"
        class="field"
        :class="{ error: v$.event.description.$error }"
        @blur="v$.event.description.$touch"
      />

      <p
        v-if="v$.event.description.$error"
        class="errorMessage"
      >
        Description is required.
      </p>

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

      <p
        v-if="v$.event.location.$error"
        class="errorMessage"
      >
        Location is required.
      </p>

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

        <p
          v-if="v$.event.date.$error"
          class="errorMessage"
        >
          Date is required.
        </p>
      </div>

      <BaseSelect
        v-model="event.time"
        label="Time"
        :options="times"
        class="field"
        :class="{ error: v$.event.time.$error }"
        @blur="v$.event.time.$touch"
      />

      <p
        v-if="v$.event.time.$error"
        class="errorMessage"
      >
        Time is required.
      </p>

      <BaseButton
        type="submit"
        button-class="-fill-gradient"
        :disabled="v$.event.$invalid"
      >
        Submit
      </BaseButton>

      <p
        v-if="v$.event.$invalid"
        class="errorMessage"
      >
        Please fill out the required field(s).
      </p>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vue3-datepicker'
import NProgress from 'nprogress'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useMainStore } from '@/stores/index'
import { userStore } from '@/stores/userStore'
import { eventStore } from '@/stores/eventStore'

export default {
  components: {
    Datepicker,
  },
  setup() {
    const times = ref([])
    const date = ref(new Date())
    const event = ref(createFreshEventObject())
    const router = useRouter()
    const mainStore = useMainStore()
    const categories = computed(() => mainStore.categories)
    const rules = computed(() => ({
      event: {
        category: { required },
        title: { required },
        description: { required },
        location: { required },
        date: { required },
        time: { required },
      },
    }))

    for (let i = 0; i <= 23; i++) {
      times.value.push(i + ':00')
    }

    async function createEvent() {
      this.v$.$touch()
      const isFormValid = await this.v$.$validate()
      if (!isFormValid) return
      NProgress.start()
      eventStore()
        .createEvent(this.event)
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
      const user = userStore().user
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
      v$: useVuelidate(rules, { event }),
      times,
      categories,
      event,
      createEvent,
    }
  },
}
</script>
