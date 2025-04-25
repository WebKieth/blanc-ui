<script setup lang="ts">
import cn from 'classnames'
import { computed, ExtractPublicPropTypes, inject, ref } from 'vue';
import { $buttonGroupProvided, ButtonGroupProvided } from '../buttonGroup/ButtonGroup';
import { buttonProps } from './button.modules';


const props = defineProps(buttonProps)
export type ButtonProps = ExtractPublicPropTypes<typeof props>
const emit = defineEmits<{
  click: [e: Event]
}>()
const { props: groupProps, emit: groupEmit } = inject<ButtonGroupProvided>($buttonGroupProvided, { props: undefined, emit: undefined })
const $el = ref()

const isInGroup = computed(() => Boolean(groupProps))

const isActive = computed(() => props.active || (isInGroup.value && groupProps?.value && groupProps.value === props.groupKey))

const handleClick = (e: Event) => {
  if (props.disabled) return
  if (props.groupKey && !isActive.value && groupEmit) {
    groupEmit('change', props.groupKey)
  }
  emit('click', e)
}

const isLast = computed(() => isInGroup.value && !$el.value?.nextElementSibling)
const isMiddle = computed(() => isInGroup.value && Boolean($el.value?.previousElementSibling && $el.value?.nextElementSibling))
const isFirst = computed(() => isInGroup.value && !$el.value?.previousElementSibling)
</script>
<template>
  <button
    v-bind="$attrs"
    ref='$el'
    :class="[
        cn({[props.style]: props.style}),

        {
          [cn({
            [props.variants.disabled]: props.variants.disabled
          })]: props.variants && props.disabled
        },
        {
          [cn({
            [props.variants.inGroup]: props.variants.inGroup
          })]: props.variants && isInGroup
        },
        {
          [cn({
            [props.variants.disabled]: props.variants.disabled
          })]: props.variants && props.disabled
        },
        {
          [cn({
            [props.variants.active]: props.variants.active,
        })]: props.variants && isActive
        },
        {
          [cn({
            [props.variants.first]: props.variants.first,
          })]: props.variants && isFirst
        },
        {
          [cn({
            [props.variants.middle]: props.variants.middle,
          })]: props.variants && isMiddle
        },
        {
          [cn({
            [props.variants.last]: props.variants.last,
          })]: props.variants && isLast
        }
      ]"
      :disabled="props.disabled"
      @click="handleClick"
    >
    <slot />
  </button>
</template>