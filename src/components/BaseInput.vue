<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input v-bind="$attrs" :value="modelValue" @input="updateValue" />
  </div>
</template>
<script>
import { formFieldMixin } from '../mixins/formFieldMixin'

export default {
  compatConfig: {
    MODE: 3,
  },
  mixins: [formFieldMixin],
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
  },
}
</script>
