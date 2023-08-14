<template>
  <v-text-field
    clearable
    v-bind="$attrs"
    density="compact"
    :label="label"
    :value="modelValue"
    variant="outlined"
    @input="updateValue"
  />
</template>
<script>
import { formFieldMixin } from '../mixins/formFieldMixin'

export default {
  mixins: [formFieldMixin],
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
}
</script>
