<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input v-bind="$attrs" :value="value" @input="updateValue" />
  </div>
</template>
<script>
import { formFieldMixin } from '../mixins/formFieldMixin'

export default {
  mixins: [formFieldMixin],
  props: {
    value: [String, Number],
  },
}
</script>
