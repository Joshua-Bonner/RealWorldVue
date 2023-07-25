<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select v-bind="$attrs" :value="modelValue" @change="updateValue">
      <option
        v-for="option in options"
        :key="option.id"
        :value="option"
        :selected="option === value"
      >
        {{ option }}
      </option>
    </select>
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
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
}
</script>
