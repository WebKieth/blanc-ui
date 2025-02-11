import { definePropType } from '../../utils'
import { defineComponent, ExtractPublicPropTypes, provide } from "vue";
import { buttonGroupStyle } from './styles.css';
import { ButtonGroupChangeActiveHandler } from './types';

export const buttonGroupProps = {
  style: {
    type: String,
    default: buttonGroupStyle
  },
  value: {
    type: definePropType<string | number | null>(null),
    default: null
  },
  whenChange: {
    type: definePropType<ButtonGroupChangeActiveHandler | null>(null),
    default: null
  }
}

export const $buttonGroupProvided = Symbol('button-group-provided')

export type ButtonGroupProps = ExtractPublicPropTypes<typeof buttonGroupProps>

export const ButtonGroup = defineComponent({
  name: 'ButtonGroup',
  props: buttonGroupProps,
  setup(props, {slots}) {
    provide<ButtonGroupProps>($buttonGroupProvided, props)
    return () => (
      <div class={props.style}>
        {slots.default && slots.default()}
      </div>
    )
  }
})