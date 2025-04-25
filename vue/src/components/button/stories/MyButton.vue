<script lang='ts' setup>
import { definePropType } from '../../../utils'
import { buttonProps } from '../button.modules';
import Button from '../Button.vue'
import cn from 'classnames'
import { myButtonStyleVariants } from './examples.css.ts'
import { computed } from 'vue';
const props = defineProps({
  size: {
    type: definePropType<'small' | 'medium' | 'large'>(String),
    default: 'medium'
  },
  variant: {
    type: definePropType<'primary' | 'secondary'>(String),
    default: 'primary'
  },
  rounded: {
    type: definePropType<boolean>(Boolean),
    default: false
  },
  ...buttonProps
})
const style = computed(() => cn(props.style, myButtonStyleVariants[props.size], myButtonStyleVariants[props.variant]))
console.log(style.value)
</script>
<template>
  <Button
    v-bind="props"
    :style="style"
  >
    <slot />
  </Button>
</template>