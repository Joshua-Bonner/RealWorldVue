import { createStore } from 'vuex'
import * as event from '@/store/modules/event.js'

export const store = createStore({
  modules: {
    event,
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
  },
})

export default store
