import { defineComponent, ExtractPublicPropTypes, ref } from 'vue'
import cn from 'classnames'
import { Icon } from '../icon/Icon'
import { CheckboxSizes } from '../../../../shared/components/checkbox/types'
import { definePropType } from '../../utils'
import { IconName } from '../../../../shared/components/icon/types'

import {
  checkboxStyle,
  checkboxFieldStyle,
  checkboxFieldVariants,
  checkboxInputAreaStyle,
  checkboxIconStyle,
  checkboxIconVariants,
  checkboxTextContainerStyle,
  checkboxLabelStyle,
  checkboxLabelVariants,
  checkboxCaptionStyle,
  checkboxCaptionVariants
} from '@shared/components/checkbox'

export const checkboxProps = {
  id: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  caption: {
    type: String,
    default: ''
  },
  value: {
    type: Boolean,
    required: true,
  },
  size: {
    type: definePropType<CheckboxSizes>(String),
    default: 'medium',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  style: {
    type: String,
    default: checkboxStyle
  },
  fieldStyle: {
    type: String,
    default: checkboxFieldStyle
  },
  fieldVariants: {
    type: Object,
    default: checkboxFieldVariants
  },
  inputAreaStyle: {
    type: String,
    default: checkboxInputAreaStyle
  },
  iconStyle: {
    type: String,
    default: checkboxIconStyle
  },
  iconVariants: {
    type: Object,
    default: checkboxIconVariants
  },
  textContainerStyle: {
    type: String,
    default: checkboxTextContainerStyle
  },
  labelStyle: {
    type: String,
    default: checkboxLabelStyle
  },
  labelVariants: {
    type: Object,
    default: checkboxLabelVariants
  },
  captionStyle: {
    type: String,
    default: checkboxCaptionStyle
  },
  captionVariants: {
    type: Object,
    default: checkboxCaptionVariants
  },
  checkedIconName: {
    type: definePropType<IconName>(String),
    default: 'ri-check-line'
  },
  uncheckedIconName: {
    type: definePropType<IconName>(String),
    default: 'ri-check-line'
  }
} as const

export type CheckboxProps = ExtractPublicPropTypes<typeof checkboxProps>

export type CheckboxEmitters = {
  change: (value: boolean) => void
}

export const checkboxEmitters: CheckboxEmitters = {
  change: (value) =>  typeof value === 'boolean'
}

export const Checkbox = defineComponent({
  name: 'Checkbox',
  components: { Icon },
  props: checkboxProps,
  emits: checkboxEmitters,
  setup(props, { slots, emit }) {
    const $inputRef = ref<HTMLInputElement>()
    const handleChange = () => {
      if (!$inputRef.value || props.disabled) return
      const { checked } = $inputRef.value
      emit('change', checked)
    }

    const onKeyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') handleChange()
    }

    return () => (
      <div
        class={cn({[props.style]: props.style})}
      >
        <div
          tabindex={0}
          class={cn({
            [props.fieldStyle]: props.fieldStyle,
            [props.fieldVariants[props.size]]: props.fieldVariants[props.size],
            [props.fieldVariants.disabled]: props.disabled && props.fieldVariants.disabled,
            [props.fieldVariants.checked]: props.value && props.fieldVariants.checked,
            [props.fieldVariants.unchecked] : props.value && props.fieldVariants.unchecked
          })}
          onKeydown={onKeyDownHandler}
        >
          <input
            ref={$inputRef}
            type="checkbox"
            class={cn({
              [props.inputAreaStyle]: props.inputAreaStyle
            })}
            id={props.id}
            value={props.value}
            disabled={props.disabled}
            onChange={handleChange}
            tabindex={-1}
          />
          <Icon
            class={cn({
              [props.iconStyle]: props.iconStyle,
              [props.iconVariants[props.size]]: props.iconVariants[props.size],
              [props.iconVariants.disabled]: props.disabled && props.iconVariants.disabled,
              [props.iconVariants.checked]: props.value && props.iconVariants.checked,
              [props.iconVariants.unchecked]: !props.value && props.iconVariants.unchecked
            })}
            name={props.value ? props.checkedIconName : props.uncheckedIconName}
          />
        </div>
        <div class={cn({[props.textContainerStyle]: props.textContainerStyle})}>
          {(props.label || props.caption) ?
            <>
              {props.label &&
                <label
                  class={cn({
                    [props.labelStyle]: props.labelStyle,
                    [props.labelVariants[props.size]]: props.labelVariants[props.size],
                    [props.labelVariants.disabled]: props.disabled && props.labelVariants.disabled,
                    [props.labelVariants.checked]: props.labelVariants.checked && props.value,
                    [props.labelVariants.unchecked]: props.labelVariants.unchecked && !props.value
                  })}
                  for={props.id}
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
                    [props.captionVariants.checked]: props.value && props.captionVariants.checked,
                    [props.captionVariants.unchecked]: !props.value && props.captionVariants.unchecked
                  })}
                >{props.caption}</div>
              }
            </>
            : slots.label &&
              slots.label()
          }
        </div>
      </div>
    )
  },
})
