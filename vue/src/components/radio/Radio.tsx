import { defineComponent, ExtractPublicPropTypes } from 'vue'
import { definePropType } from '../../utils'
import { RadioSize } from './types'

export const radioProps = {
  boxStyle: {
    type: String,
    default: ''
  },
  fieldStyle: {
    type: String,
    default: ''
  },
  fieldVariants: {
    type: Object,
    default: {}
  },
  groupKey: {
    type: definePropType<string | number | symbol | null>(null),
    default: null
  },
  checked: {
    type: definePropType<boolean>(Boolean),
    default: false
  },
  size: {
    type: definePropType<RadioSize>(String),
    default: 'medium'
  },
  disabled: {
    type: definePropType<boolean>(Boolean),
    default: false
  }
} as const

export type RadioProps = ExtractPublicPropTypes<typeof radioProps>

export type RadioEmitters = {
  check: (groupKey: string | number | symbol) => void
}

const radioEmitters: RadioEmitters = {
  check: (groupKey) => typeof groupKey === 'string' || typeof groupKey === 'number' || typeof groupKey === 'symbol'
}

export const Radio = defineComponent({
  name: 'Radio',
  props: radioProps,
  emits: radioEmitters,
  setup(props) {
    return () => (
      <div class={props.boxStyle}>

      </div>
    )
  }
})