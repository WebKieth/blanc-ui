import { computed, defineComponent, ExtractPublicPropTypes, inject, ref, watch } from 'vue'
import { v4 as uuid } from 'uuid'
import { definePropType } from '../../utils'
import cn from 'classnames'
import { RadioSize } from './types'
import { radioCaptionStyle, radioCaptionVariants, radioDotStyle, radioDotVariants, radioFieldStyle, radioFieldVariants, radioInputAreaStyle, radioLabelStyle, radioLabelVariants, radioStyle, radioTextContainerStyle } from '@shared/components/radio'
import { RadioGroupProvided, $radioGroupProvided } from '../radioGroup/RadioGroup'

export const radioProps = {
  style: {
    type: String,
    default: radioStyle
  },
  fieldStyle: {
    type: String,
    default: radioFieldStyle
  },
  fieldVariants: {
    type: Object,
    default: radioFieldVariants
  },
  inputAreaStyle: {
    type: String,
    default: radioInputAreaStyle
  },
  dotStyle: {
    type: String,
    default: radioDotStyle
  },
  dotVariants: {
    type: Object,
    default: radioDotVariants
  },
  textContainerStyle: {
    type: String,
    default: radioTextContainerStyle
  },
  labelStyle: {
    type: String,
    default: radioLabelStyle
  },
  labelVariants: {
    type: Object,
    default: radioLabelVariants
  },
  captionStyle: {
    type: String,
    default: radioCaptionStyle
  },
  captionVariants: {
    type: Object,
    default: radioCaptionVariants
  },
  id: {
    type: String,
    default: uuid()
  },
  label: {
    type: String,
    default: ''
  },
  caption: {
    type: String,
    default: ''
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
  check: (groupKey: string | number | symbol | null) => void
}

const radioEmitters: RadioEmitters = {
  check: () => true
}

export const Radio = defineComponent({
  name: 'Radio',
  props: radioProps,
  emits: radioEmitters,
  setup(props, { slots, emit }) {
    
    const { props: groupProps, emit: groupEmit } = inject<RadioGroupProvided>($radioGroupProvided, { props: undefined, emit: undefined })

    const $inputRef = ref<HTMLInputElement>()

    const isChecked = computed(() => props.checked || Boolean(groupProps && groupProps.value === props.groupKey))
    watch(isChecked, (value) => {
      if (!$inputRef.value) return
      $inputRef.value.checked = value
    })
    const handleCheck = () => {
      if (!$inputRef.value && props.disabled) return
      if (props.groupKey && !isChecked.value && groupEmit) {
        groupEmit('change', props.groupKey)
      }
      emit('check', props.groupKey || null)
    }
    const onKeydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') handleCheck()
    }
    
    return () => (
      <div class={cn({[props.style]: props.style})}>
        <div
          tabindex={0}
          class={cn({
            [props.fieldStyle]: props.fieldStyle,
            [props.fieldVariants[props.size]]: props.fieldVariants[props.size],
            [props.fieldVariants.disabled]: props.disabled && props.fieldVariants.disabled,
            [props.fieldVariants.checked]: isChecked.value && props.fieldVariants.checked,
            [props.fieldVariants.unchecked] : !isChecked.value && props.fieldVariants.unchecked
          })}
          onKeydown={onKeydownHandler}
        >
          <input
            ref={$inputRef}
            type="radio"
            class={cn({
              [props.inputAreaStyle]: props.inputAreaStyle
            })}
            id={props.id}
            value={isChecked.value}
            disabled={props.disabled}
            onChange={handleCheck}
            tabindex={-1}
          />
          <div
            class={cn({
              [props.dotStyle]: props.dotStyle,
              [props.dotVariants[props.size]]: props.dotVariants[props.size],
              [props.dotVariants.disabled]: props.disabled && props.dotVariants.disabled,
              [props.dotVariants.checked]: isChecked.value && props.dotVariants.checked,
              [props.dotVariants.unchecked]: !isChecked.value && props.dotVariants.unchecked
            })}
          ></div>
        </div>
        <div class={cn({[props.textContainerStyle]: props.textContainerStyle})}>
          {(props.label || props.caption)
            ? <>
              {props.label &&
                <label
                  for={props.id}
                  class={cn({
                    [props.labelStyle]: props.labelStyle,
                    [props.labelVariants[props.size]]: props.labelVariants[props.size],
                    [props.labelVariants.disabled]: props.disabled && props.labelVariants.disabled,
                    [props.labelVariants.checked]: props.labelVariants.checked && isChecked.value,
                     [props.labelVariants.unchecked]: props.labelVariants.unchecked && !isChecked.value
                  })}
                >
                  {props.label}
                </label>
              }
              {props.caption &&
                <div
                  class={cn({
                    [props.captionStyle]: props.captionStyle,
                    [props.captionVariants[props.size]]: props.captionVariants[props.size],
                    [props.captionVariants.disabled]: props.disabled && props.captionVariants.disabled,
                    [props.captionVariants.checked]: isChecked.value && props.captionVariants.checked,
                    [props.captionVariants.unchecked]: !isChecked.value && props.captionVariants.unchecked
                  })}
                >{props.caption}</div>
              }
            </>
            : slots.label && slots.label()
          }
        </div>
      </div>
    )
  }
})