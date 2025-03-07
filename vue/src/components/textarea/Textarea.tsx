import { TextareaEmitters, TextareaSize, TextareaValue } from "@shared/components/textarea/types";
import { definePropType } from "../../utils";
import { computed, defineComponent, ExtractPublicPropTypes, Ref, SlotsType, useId, VNodeChild } from "vue";
import cn from 'classnames'
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
  textareaVariants,
  textareaCaptionStyle,
  textareaCaptionVariants
} from "@shared/components/textarea/styles.css";
import { useInputStateHandlers } from "../../hooks";

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
  captionStyle: {
    type: String,
    default: textareaCaptionStyle
  },
  captionVariants: {
    type: Object,
    default: textareaCaptionVariants
  },
  id: {
    type: definePropType<string>(String),
    default: ''
  },
  label: {
    type: definePropType<string>(String),
    default: ''
  },
  caption: {
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
  },
  invalid: {
    type: definePropType<boolean>(Boolean),
    default: false
  }
} as const

export type TextareaDefaultScope = {
  id: string
  hover: Ref<boolean>
  focus: Ref<boolean>
  handleFocus: () => void
  handleBlur: () => void
}

export const textareaSlots: SlotsType<{
  default: (props: TextareaDefaultScope) => VNodeChild | undefined
  placeholder: () => VNodeChild | undefined
  label: () => VNodeChild | undefined
  caption: () => VNodeChild | undefined
}> = {}

export type TextareaProps = ExtractPublicPropTypes<typeof textareaProps>

export const textareaEmitters: TextareaEmitters = {
  input: (value: string) => typeof value === 'string',
  change: (value: string) => typeof value === 'string'
}

export const Textarea = defineComponent({
  name: 'Textarea',
  props: textareaProps,
  emits: textareaEmitters,
  slots: textareaSlots,
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
          [props.variants[props.size]]: props.variants[props.size] && props.size,
          [props.variants.disabled]: props.variants.disabled && props.disabled,
          [props.variants.invalid]: props.variants.invalid && props.invalid,
          [props.variants.hover]: hover.value,
          [props.variants.focus]: focus.value
        })}
        onMouseenter={handleMouseIn}
        onMouseleave={handleMouseOut}
      >
        {slots.label
          ? slots.label()
          : <label
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
        }
        {slots.default
          ? slots.default({
              id,
              hover,
              focus,
              handleFocus,
              handleBlur
            })
          : <>
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
                <textarea
                  id={id}
                  {...attrs}
                  class={cn({
                    [props.textareaStyle]: props.textareaStyle,
                    [props.textareaVariants[props.size]]: props.textareaVariants[props.size] && props.size,
                    [props.textareaVariants.disabled]: props.textareaVariants.disabled && props.disabled,
                    [props.textareaVariants.invalid]: props.textareaVariants.invalid && props.invalid,
                    [props.textareaVariants.filled]: props.textareaVariants.filled && props.value,
                    [props.textareaVariants.hover]: props.textareaVariants.hover && hover.value,
                    [props.textareaVariants.focus]: props.textareaVariants.focus && focus.value
                  })}
                  placeholder={props.placeholder}
                  disabled={props.disabled}
                  value={props.value}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={(e: Event) => emit('change', (e.target as HTMLInputElement).value)}
                  onInput={(e: Event) => emit('input', (e.target as HTMLInputElement).value)}
                ></textarea>
              </div>
              {slots.caption
                ? slots.caption()
                : props.caption
                  ? <div class={cn({
                      [props.captionStyle]: props.captionStyle,
                      [props.captionVariants[props.size]]: props.captionVariants[props.size] && props.size,
                      [props.captionVariants.disabled]: props.captionVariants.disabled && props.disabled,
                      [props.captionVariants.invalid]: props.captionVariants.invalid && props.invalid,
                      [props.captionVariants.filled]: props.captionVariants.filled && props.value,
                      [props.captionVariants.hover]: props.captionVariants.hover && hover.value,
                      [props.captionVariants.focus]: props.captionVariants.focus && focus.value
                    })}>
                      {props.caption}
                    </div>
                  : <></>
              }
            </>
        }
      </div>
    )
  }
})