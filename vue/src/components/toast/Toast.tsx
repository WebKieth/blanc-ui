import { defineComponent, ExtractPublicPropTypes } from "vue"
import { definePropType } from "../../utils"
import cn from 'classnames'
import {
  toastStyle,
  toastVariants,
  toastBoxStyle,
  toastBoxVariants,
  toastContentStyle,
  toastContentVariants,
  toastIconStyle,
  toastIconVariants,
  toastTitleStyle,
  toastTitleVariants,
  toastMessageStyle,
  toastMessageVariants,
  toastHeaderStyle,
  toastHeaderVariants,
  toastCloseStyle,
  toastCloseVariants
} from "@shared/components/toast/styles.css"
import { ToastSize } from "@shared/components/toast/types"
import { Icon } from "../icon/Icon"

export const toastProps = {
  style: {
    type: String,
    default: toastStyle
  },
  variants: {
    type: Object,
    default: toastVariants
  },
  boxStyle: {
    type: String,
    default: toastBoxStyle
  },
  boxVariants: {
    type: Object,
    default: toastBoxVariants
  },
  contentStyle: {
    type: String,
    default: toastContentStyle
  },
  iconStyle: {
    type: String,
    default: toastIconStyle
  },
  iconVariants: {
    type: Object,
    default: toastIconVariants
  },
  contentVariants: {
    type: Object,
    default: toastContentVariants
  },
  headerStyle: {
    type: String,
    default: toastHeaderStyle
  },
  headerVariants: {
    type: Object,
    default: toastHeaderVariants
  },
  titleStyle: {
    type: String,
    default: toastTitleStyle
  },
  titleVariants: {
    type: Object,
    default: toastTitleVariants
  },
  closeStyle: {
    type: String,
    default: toastCloseStyle
  },
  closeVariants: {
    type: Object,
    default: toastCloseVariants
  },
  messageStyle: {
    type: String,
    default: toastMessageStyle
  },
  messageVariants: {
    type: Object,
    default: toastMessageVariants
  },
  size: {
    type: definePropType<ToastSize>(String),
    default: 'medium'
  },
  iconName: {
    type: definePropType<string>(String),
    default: 'ri-message-line'
  },
  closeIconName: {
    type: definePropType<string>(String),
    default: 'ri-close-line'
  },
  title: {
    type: definePropType<string>(String),
    default: ''
  },
  message: {
    type: definePropType<string>(String),
    default: ''
  }
}

export type ToastProps = ExtractPublicPropTypes<typeof toastProps>

export const toastEmitters = {
  close: () => true
}

export type ToastEmitters = {
  close: () => void
}

export const Toast = defineComponent({
  name: 'Toast',
  props: toastProps,
  emits: toastEmitters,
  components: { Icon },
  setup(props, { slots, attrs, emit }) {
    return () => (
      <div
        {...attrs}
        class={cn({
          [props.style]: props.style,
          [props.variants[props.size]]: props.variants[props.size] && props.size
        })}
      >
        {slots.default
          ? slots.default({ onClose: () => emit('close') })
          : <div
              class={cn({
                [props.boxStyle]: props.boxStyle,
                [props.boxVariants[props.size]]: props.boxVariants[props.size] && props.size
              })}
            >
              <div
                class={cn({
                  [props.iconStyle]: props.iconStyle,
                  [props.iconVariants[props.size]]: props.iconVariants[props.size] && props.size
                })}
              >
                {slots.icon
                  ? slots.icon()
                  : <Icon name={props.iconName} size={props.size} />
                }
              </div>
              <div
                class={cn({
                  [props.contentStyle]: props.contentStyle,
                  [props.contentVariants[props.size]]: props.contentVariants[props.size] && props.size
                })}
              >
                <div
                  class={cn({
                    [props.headerStyle]: props.headerStyle,
                    [props.headerVariants[props.size]]: props.headerVariants[props.size] && props.size
                  })}
                >
                  {slots.title
                    ? slots.title()
                    : <div
                        class={cn({
                          [props.titleStyle]: props.titleStyle,
                          [props.titleVariants[props.size]]: props.titleVariants[props.size] && props.size
                        })}
                      >
                        {props.title}
                      </div>
                  }
                  {slots.close
                    ? slots.close()
                    : <div
                        class={cn({
                          [props.closeStyle]: props.closeStyle,
                          [props.closeVariants[props.size]]: props.closeVariants[props.size] && props.size
                        })}
                        onClick={() => emit('close')}
                      >
                        <Icon name={props.closeIconName} size={props.size} />
                      </div>
                  }
                </div>
                {slots.message
                  ? slots.message()
                    : <div
                        class={cn({
                          [props.messageStyle]: props.messageStyle,
                          [props.messageVariants[props.size]]: props.messageVariants[props.size] && props.size
                        })}
                      >
                        {props.message}
                      </div>
                  }
              </div>
            </div>
        }
      </div>
    )
  }
})