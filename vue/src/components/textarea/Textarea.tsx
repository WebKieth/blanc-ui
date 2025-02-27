import { TextareaEmitters, TextareaSize, TextareaValue } from "@shared/components/textarea/types";
import { definePropType } from "../../utils";
import { defineComponent, ExtractPublicPropTypes, ref } from "vue";
import cn from 'classnames'
import { v4 as uuid } from 'uuid'
import {
  textareaFieldBoxStyle,
  textareaFieldBoxVariants,
  textareaFieldStyle,
  textareaFieldVariants,
  textareaLabelStyle,
  textareaLabelVariants,
  textareaPlaceholderStyle,
  textareaPlaceholderVariants,
  textareaStyle,
  textareaVariants
} from "@shared/components/textarea/styles.css";

export const textareaProps = {
  style: {
    type: String,
    default: textareaStyle
  },
  variants: {
    type: Object,
    default: textareaVariants
  },
  labelStyle: {
    type: String,
    default: textareaLabelStyle
  },
  labelVariants: {
    type: Object,
    default: textareaLabelVariants
  },
  fieldBoxStyle: {
    type: String,
    default: textareaFieldBoxStyle
  },
  fieldBoxVariants: {
    type: Object,
    default: textareaFieldBoxVariants
  },
  textareaStyle: {
    type: String,
    default: textareaFieldStyle
  },
  textareaVariants: {
    type: Object,
    default: textareaFieldVariants
  },
  placeholderStyle: {
    type: String,
    default: textareaPlaceholderStyle
  },
  placeholderVariants: {
    type: Object,
    default: textareaPlaceholderVariants
  },
  id: {
    type: definePropType<string>(String),
    default: ''
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
    type: definePropType<TextareaValue>(String),
    default: ''
  },
  disabled: {
    type: definePropType<boolean>(Boolean),
    default: false
  },
  size: {
    type: definePropType<TextareaSize>(String),
    default: 'medium'
  }
} as const

export type TextareaProps = ExtractPublicPropTypes<typeof textareaProps>

export const textareaEmitters: TextareaEmitters = {
  input: (value: string) => typeof value === 'string',
  change: (value: string) => typeof value === 'string'
}

export const Textarea = defineComponent({
  name: 'Textarea',
  props: textareaProps,
  emits: textareaEmitters,
  setup(props, { slots, attrs, emit }) {
    const id = props.id ? props.id : uuid()
    const hover = ref(false)
    const focus = ref(false)

    const handleMouseIn = () => {
      if (props.disabled) return
      hover.value = true
    }

    const handleMouseOut = () => hover.value = false

    const handleFocus = () => {
      if (props.disabled) return
      focus.value = true
    }

    const handleBlur = () => focus.value = false

    return () => (
      <div
        class={cn({
          [props.style]: props.style,
          [props.variants[props.size]]: props.variants[props.size] && props.size,
          [props.variants.disabled]: props.variants.disabled && props.disabled,
          [props.variants.hover]: hover.value,
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
              hover,
              focus,
              handleFocus,
              handleBlur
            })
          : <div
              class={cn({
                [props.fieldBoxStyle]: props.fieldBoxStyle,
                [props.fieldBoxVariants[props.size]]: props.fieldBoxVariants[props.size] && props.size,
                [props.fieldBoxVariants.disabled]: props.fieldBoxVariants.disabled && props.disabled,
                [props.fieldBoxVariants.filled]: props.fieldBoxVariants.filled && props.value,
                [props.fieldBoxVariants.hover]: props.fieldBoxVariants.hover && hover.value,
                [props.fieldBoxVariants.focus]: props.fieldBoxVariants.focus && focus.value
              })}
            >
              {slots.placeholder && (
                <div class={cn({
                  [props.placeholderStyle]: props.placeholderStyle,
                  [props.placeholderVariants[props.size]]: props.placeholderVariants[props.size] && props.size,
                  [props.placeholderVariants.disabled]: props.placeholderVariants.disabled && props.disabled,
                  [props.placeholderVariants.filled]: props.placeholderVariants.filled && props.value,
                  [props.placeholderVariants.hover]: props.placeholderVariants.hover && hover.value,
                  [props.placeholderVariants.focus]: props.placeholderVariants.focus && focus.value
                })}>
                  {slots.placeholder()}
                </div>
              )}
              <textarea
                id={id}
                {...attrs}
                class={cn({
                  [props.textareaStyle]: props.textareaStyle,
                  [props.textareaVariants[props.size]]: props.textareaVariants[props.size] && props.size,
                  [props.textareaVariants.disabled]: props.textareaVariants.disabled && props.disabled,
                  [props.textareaVariants.filled]: props.textareaVariants.filled && props.value,
                  [props.textareaVariants.hover]: props.textareaVariants.hover && hover.value,
                  [props.textareaVariants.focus]: props.textareaVariants.focus && focus.value
                })}
                placeholder={props.placeholder}
                value={props.value}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e: Event) => emit('change', (e.target as HTMLInputElement).value)}
                onInput={(e: Event) => emit('input', (e.target as HTMLInputElement).value)}
              ></textarea>
            </div>
        }
      </div>
    )
  }
})