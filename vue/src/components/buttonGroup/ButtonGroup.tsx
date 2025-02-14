import { definePropType } from '../../utils'
import { defineComponent, ExtractPublicPropTypes, provide } from "vue";
import {
  type ButtonGroupChangeActiveHandler,
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
  change: ButtonGroupChangeActiveHandler
}

const buttonGroupEmitters: ButtonGroupEmitters = {
  change: (newValue) => typeof newValue === 'string' || typeof newValue === 'number'
}

export const $buttonGroupProvided = Symbol('button-group-provided')

export type ButtonGroupProps = ExtractPublicPropTypes<typeof buttonGroupProps>

export type ButtonGroupProvided = {
  props: ButtonGroupProps,
  emit: (event: 'change', newValue: string | number) => void
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