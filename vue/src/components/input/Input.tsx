import { definePropType } from '../../utils'
import { ExtractPublicPropTypes, computed, defineComponent, useId } from 'vue'
import cn from 'classnames'
import {
  inputFieldBoxStyle,
  inputFieldBoxVariants,
  inputFieldStyle,
  inputFieldVariants,
  inputLabelStyle,
  inputLabelVariants,
  inputStyle,
  inputVariants,
  type InputSize,
  type InputValue,
  type InputType,
  type InputId,
  inputPlaceholderStyle,
  inputPlaceholderVariants
} from '@shared/components/input'
import { InputEmitters } from '@shared/components/input/types'
import { useInputStateHandlers } from '../../hooks'

export const inputProps = {
  style: {
    type: String,
    default: inputStyle
  },
  variants: {
    type: Object,
    default: inputVariants
  },
  labelStyle: {
    type: String,
    default: inputLabelStyle
  },
  labelVariants: {
    type: Object,
    default: inputLabelVariants
  },
  fieldBoxStyle: {
    type: String,
    default: inputFieldBoxStyle
  },
  fieldBoxVariants: {
    type: Object,
    default: inputFieldBoxVariants
  },
  inputStyle: {
    type: String,
    default: inputFieldStyle
  },
  inputVariants: {
    type: Object,
    default: inputFieldVariants
  },
  placeholderStyle: {
    type: String,
    default: inputPlaceholderStyle
  },
  placeholderVariants: {
    type: Object,
    default: inputPlaceholderVariants
  },
  id: {
    type: definePropType<InputId>(String),
    default: ''
  },
  type: {
    type: definePropType<InputType>(String),
    default: 'text'
  },
  label: {
    type: definePropType<string>(String),
    default: ''
  },
  placeholder: {
    type: definePropType<string>(String),
    default: ''
  },
  value: {
    type: definePropType<InputValue>(String),
    default: ''
  },
  disabled: {
    type: definePropType<boolean>(Boolean),
    default: false
  },
  size: {
    type: definePropType<InputSize>(String),
    default: 'medium'
  },
  invalid: {
    type: definePropType<boolean>(Boolean),
    default: false
  }
} as const

export type InputProps = ExtractPublicPropTypes<typeof inputProps>

export const inputEmitters: InputEmitters = {
  input: (value: string) => typeof value === 'string',
  change: (value: string) => typeof value === 'string'
}

export const Input = defineComponent({
  name: 'Input',
  props: inputProps,
  emits: inputEmitters,
  setup(props, { slots, attrs, emit }) {
    const id = props.id ? props.id : useId()
    const disabled = computed(() => props.disabled)
    const {
      hover,
      focus,
      handleMouseIn,
      handleMouseOut,
      handleFocus,
      handleBlur
    } = useInputStateHandlers(disabled)

    return () => (
      <div
        class={cn({
          [props.style]: props.style,
          [props.variants[props.size]]: props.variants[props.size],
          [props.variants.disabled]: props.variants.disabled && props.disabled,
          [props.variants.invalid]: props.variants.invalid && props.invalid,
          [props.variants.hover]: hover.value,
          [props.variants.filled]: props.value,
          [props.variants.focus]: focus.value
        })}
        onMouseenter={handleMouseIn}
        onMouseleave={handleMouseOut}
      >
        {props.label
          ? <label
              for={id}
              class={cn({
                [props.labelStyle]: props.labelStyle,
                [props.labelVariants[props.size]]: props.labelVariants[props.size] && props.size,
                [props.labelVariants.disabled]: props.labelVariants.disabled && props.disabled,
                [props.labelVariants.invalid]: props.labelVariants.invalid && props.invalid,
                [props.labelVariants.hover]: props.labelVariants.hover && hover.value,
                [props.labelVariants.filled]: props.labelVariants.filled && props.value,
                [props.labelVariants.focus]: props.labelVariants.focus && focus.value
              })}
            >
            {props.label}
          </label>
          : slots.label && slots.label()
        }
        {slots.default
          ? slots.default({
              id,
              hover,
              focus,
              handleFocus,
              handleBlur
            })
          : 
            <div
              class={cn({
                [props.fieldBoxStyle]: props.fieldBoxStyle,
                [props.fieldBoxVariants[props.size]]: props.fieldBoxVariants[props.size] && props.size,
                [props.fieldBoxVariants.disabled]: props.fieldBoxVariants.disabled && props.disabled,
                [props.fieldBoxVariants.invalid]: props.fieldBoxVariants.invalid && props.invalid,
                [props.fieldBoxVariants.filled]: props.fieldBoxVariants.filled && props.value,
                [props.fieldBoxVariants.hover]: props.fieldBoxVariants.hover && hover.value,
                [props.fieldBoxVariants.focus]: props.fieldBoxVariants.focus && focus.value
              })}
            >
              {slots.prefix && slots.prefix()}
              {slots.placeholder && (
                <div class={cn({
                  [props.placeholderStyle]: props.placeholderStyle,
                  [props.placeholderVariants[props.size]]: props.placeholderVariants[props.size] && props.size,
                  [props.placeholderVariants.disabled]: props.placeholderVariants.disabled && props.disabled,
                  [props.placeholderVariants.invalid]: props.placeholderVariants.invalid && props.invalid,
                  [props.placeholderVariants.filled]: props.placeholderVariants.filled && props.value,
                  [props.placeholderVariants.hover]: props.placeholderVariants.hover && hover.value,
                  [props.placeholderVariants.focus]: props.placeholderVariants.focus && focus.value
                })}>
                  {slots.placeholder()}
                </div>
              )}
              <input
                id={id}
                {...attrs}
                class={cn({
                  [props.inputStyle]: props.inputStyle,
                  [props.inputVariants[props.size]]: props.inputVariants[props.size] && props.size,
                  [props.inputVariants.disabled]: props.inputVariants.disabled && props.disabled,
                  [props.inputVariants.invalid]: props.inputVariants.invalid && props.invalid,
                  [props.inputVariants.filled]: props.inputVariants.filled && props.value,
                  [props.inputVariants.hover]: props.inputVariants.hover && hover.value,
                  [props.inputVariants.focus]: props.inputVariants.focus && focus.value
                })}
                placeholder={props.placeholder}
                type={props.type}
                value={props.value}
                disabled={props.disabled}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e: Event) => emit('change', (e.target as HTMLInputElement).value)}
                onInput={(e: Event) => emit('input', (e.target as HTMLInputElement).value)}
              />
              {slots.postfix && slots.postfix()}
            </div>
        }
      </div>
    )
  }
})
