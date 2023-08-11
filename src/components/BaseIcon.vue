<template>
  <div class="icon-wrapper">
    <!-- eslint-disable-next-line -->
    <svg class="icon" :width="width" :height="height" v-html="svg"></svg>
    <slot />
  </div>
</template>
<script>
import feather from 'feather-icons'
import { computed } from 'vue'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
  },
  setup(props) {
    const svg = computed(() =>
      feather.icons[props.name].toSvg({
        width: props.width,
        height: props.height,
      })
    )
    return { svg }
  },
}
</script>
<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 1rem;
  font-weight: 600;
  margin-right: 6px;
}
.icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
</style>
