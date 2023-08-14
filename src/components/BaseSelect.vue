<template>
  <v-select
    clearable
    v-bind="$attrs"
    :label="label"
    :value="modelValue"
    :items="options"
    variant="outlined"
    @change="updateValue"
  >
  </v-select>
</template>
<script>
import { formFieldMixin } from '../mixins/formFieldMixin'
export default {
  mixins: [formFieldMixin],
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
  },
}
</script>
