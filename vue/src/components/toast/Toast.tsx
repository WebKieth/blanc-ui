import { defineComponent, ExtractPublicPropTypes } from "vue"
import { definePropType } from "../../utils"
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
} from "./styles.css"
import { ToastSize } from "./types"
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
  title: {
    type: definePropType<string>(String),
    default: ''
  },
  message: {
    type: definePropType<string>(String),
    default: ''
  },
  whenClose: {
    type: definePropType<Function | null>(Function),
    default: null
  }
}

export type ToastProps = ExtractPublicPropTypes<typeof toastProps>

export const Toast = defineComponent({
  name: 'Toast',
  props: toastProps,
  components: { Icon },
  setup(props, { slots, attrs }) {
    return () => (
      <div
        {...attrs}
        class={`
          ${props.style}
          ${props.variants[props.size]}
        `}
      >
        {slots.default
          ? slots.default()
          : <div
              class={`
                ${props.boxStyle}
                ${props.boxVariants[props.size]}
              `}
            >
            <div
              class={`
                ${props.iconStyle}
                ${props.iconVariants[props.size]}
              `}
            >
              {slots.icon
                ? slots.icon()
                : <Icon name={props.iconName} size={props.size} />
              }
            </div>
            <div
              class={`
                ${props.contentStyle}
                ${props.contentVariants[props.size]}
              `}
            >
              <div
                class={`
                  ${props.headerStyle}
                  ${props.headerVariants[props.size]}
                `}
              >
                {slots.title
                    ? slots.title()
                    : <div
                        class={`
                          ${props.titleStyle}
                          ${props.titleVariants[props.size]}
                        `}
                    >
                      {props.title}
                    </div>
                }
                {props.whenClose !== null
                    ? slots.close
                      ? slots.close()
                      : <div
                        class={`
                          ${props.closeStyle}
                          ${props.closeVariants[props.size]}
                        `}
                        onClick={() => props.whenClose && props.whenClose()}
                      >
                        <Icon name='ri-close-line' size={props.size} />
                      </div>
                    : null
                }
              </div>
              {slots.message
                ? slots.message()
                : <div
                    class={`
                      ${props.messageStyle}
                      ${props.messageVariants[props.size]}
                    `}
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