import { definePropType } from "src/utils";
import { defineComponent, ExtractPublicPropTypes, provide } from "vue";

export const radioGroupProps = {
  value: {
    type: definePropType<string | number | null>(null),
    default: null
  }
}

export type RadioGroupEmitters = {
  change: (newValue: string | number | symbol) => void
}

const radioGroupEmitters: RadioGroupEmitters = {
  change: (newValue) => typeof newValue === 'string' || typeof newValue === 'number' || typeof 'symbol'
}

export const $radioGroupProvided = Symbol('radio-group-provided')

export type RadioGroupProps = ExtractPublicPropTypes<typeof radioGroupProps>

export type RadioGroupProvided = {
  props: RadioGroupProps,
  emit: (event: 'change', newValue: string | number | symbol) => void
}

export const RadioGroup = defineComponent({
  name: 'RadioGroup',
  props: radioGroupProps,
  emits: radioGroupEmitters,
  setup(props, {slots, emit}) {
    provide<RadioGroupProvided>($radioGroupProvided, { props, emit })
    return () => (
      <>{slots.default && slots.default()}</>
    )
  }
})