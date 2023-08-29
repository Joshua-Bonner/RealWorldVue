<template>
  <form @submit.prevent="createEvent">
    <v-container style="width: 75%">
      <h1>Create an Event</h1>
      <BaseSelect
        v-model="event.category"
        :options="categories"
        prepend-inner-icon="mdi-shape-plus-outline"
        :class="{ error: v$.event.category.$error }"
        :label="event.category ? 'Category' : 'Select a category'"
        @blur="v$.event.category.$touch"
      />
      <p v-if="v$.event.category.$error" class="errorMessage">
        Category is required.
      </p>

      <h3>Name & describe your event</h3>
      <BaseInput
        v-model="event.title"
        :label="event.title ? 'Title' : 'Title'"
        prepend-inner-icon="mdi-format-title"
        type="text"
        placeholder="Title"
        :class="{ error: v$.event.title.$error }"
        @blur="v$.event.title.$touch"
      />

      <p v-if="v$.event.title.$error" class="errorMessage">
        Title is required.
      </p>

      <BaseInput
        v-model="event.description"
        :label="event.description ? 'Description' : 'Description'"
        prepend-inner-icon="mdi-pencil-outline"
        type="text"
        placeholder="Description"
        :class="{ error: v$.event.description.$error }"
        @blur="v$.event.description.$touch"
      />

      <p v-if="v$.event.description.$error" class="errorMessage">
        Description is required.
      </p>

      <h3>Where is your event?</h3>
      <BaseInput
        v-model="event.location"
        :label="event.location ? 'Location' : 'Location'"
        prepend-inner-icon="mdi-map-marker"
        type="text"
        placeholder="Location"
        :class="{ error: v$.event.location.$error }"
        @blur="v$.event.location.$touch"
      />

      <p v-if="v$.event.location.$error" class="errorMessage">
        Location is required.
      </p>

      <h3>When is your event?</h3>

      <VueDatePicker
        v-model="event.date"
        input-class-name="DatePickerInput"
        clearable
        placeholder="Date"
        :class="{ error: v$.event.date.$error }"
        @blur="v$.event.date.$touch"
      />

      <br />

      <p v-if="v$.event.date.$error" class="errorMessage">Date is required.</p>

      <BaseButton
        type="submit"
        button-class="-fill-gradient"
        :disabled="v$.event.$invalid"
        >Submit</BaseButton
      >

      <p v-if="v$.event.$invalid" class="errorMessage">
        <br />
        Please fill out the required field(s).
      </p>
    </v-container>
  </form>
</template>

<script>
import NProgress from 'nprogress'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useMainStore } from '@/stores/index.js'
import { useUserStore } from '@/stores/userStore.js'
import { useEventStore } from '@/stores/eventStore.js'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  components: {
    VueDatePicker,
  },
  setup() {
    const date = ref()
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
      },
    }))

    function createEvent() {
      this.v$.$touch()
      const isFormValid = this.v$.$validate()
      if (!isFormValid) return
      NProgress.start()
      useEventStore()
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
      const user = useUserStore().user
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
        attendees: [],
      }
    }

    return {
      v$: useVuelidate(rules, { event }),
      categories,
      event,
      createEvent,
    }
  },
}
</script>
<style>
.DatePickerInput {
  height: 60px;
  border-color: rgb(174, 174, 174);
  &.hover {
    border-color: black;
  }
}
</style>
