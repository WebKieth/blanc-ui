import { definePropType } from "../../../../utils"
import cn from 'classnames'
import { headerButtonIcon, headerButtonSize, headerButtonVariant, headerStyle, headerTitleStyle, headerButtonStyle } from "./stylingProps"
import { defineComponent, ExtractPublicPropTypes } from "vue"
import { Button } from "../../../button"
import { Icon } from "../../../icon"


const modalHeaderStylingProps = {
  style: headerStyle,
  titleStyle: headerTitleStyle,
  buttonStyle: headerButtonStyle,
  buttonIcon: headerButtonIcon,
  buttonSize: headerButtonSize,
  buttonVariant: headerButtonVariant
}

export const modalHeaderProps = {
  title: {
    type: definePropType<string>(String),
    default: ''
  },
  ...modalHeaderStylingProps
} as const

export type ModalHeaderProps = ExtractPublicPropTypes<typeof modalHeaderProps>

export type ModalEmitters = {
  close: () => void
}

export const modalEmitters: ModalEmitters = {
  close: () => true
}

export const ModalHeader = defineComponent({
  props: modalHeaderProps,
  emits: modalEmitters,
  setup(props, {slots, emit}) {
    return () => (
      <div class={cn({[props.style]: props.style})}>
        {slots.title
          ? slots.title()
          : <div class={cn({[props.titleStyle]: props.titleStyle})}>{props.title}</div>
        }
        {slots.button
          ? slots.button(
              { onClose: () => emit('close') }
            )
          : <Button
              class={props.buttonStyle}
              size={props.buttonSize}
              variant={props.buttonVariant}
              onClick={() => emit('close')}
            >
              <Icon
                name={props.buttonIcon}
                size={props.buttonSize}
              />
            </Button>
        }
      </div>
    )
  }
})