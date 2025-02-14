import { definePropType } from '../../utils'
import { defineComponent, ExtractPublicPropTypes, provide } from "vue";
import {
  buttonGroupStyle
} from '../../../../shared/components/buttonGroup';

export const buttonGroupProps = {
  style: {
    type: String,
    default: buttonGroupStyle
  },
  value: {
    type: definePropType<string | number | null>(null),
    default: null
  }
}

export type ButtonGroupEmitters = {
  change: (newValue: string | number | symbol) => void
}

const buttonGroupEmitters: ButtonGroupEmitters = {
  change: (newValue) => typeof newValue === 'string' || typeof newValue === 'number' || typeof 'symbol'
}

export const $buttonGroupProvided = Symbol('button-group-provided')

export type ButtonGroupProps = ExtractPublicPropTypes<typeof buttonGroupProps>

export type ButtonGroupProvided = {
  props: ButtonGroupProps,
  emit: (event: 'change', newValue: string | number | symbol) => void
}

export const ButtonGroup = defineComponent({
  name: 'ButtonGroup',
  props: buttonGroupProps,
  emits: buttonGroupEmitters,
  setup(props, {slots, emit}) {
    provide<ButtonGroupProvided>($buttonGroupProvided, {props, emit})
    return () => (
      <div class={props.style}>
        {slots.default && slots.default()}
      </div>
    )
  }
})