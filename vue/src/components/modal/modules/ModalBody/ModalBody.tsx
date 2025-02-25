import { defineComponent, ExtractPublicPropTypes } from "vue"
import cn from 'classnames'
import { definePropType } from "../../../../utils"

import { bodyStyle, bodyIconStyle, bodyIcon, bodyContentStyle, bodyIconSize } from "./stylingProps"
import { Icon } from "../../../icon"

const modalBodyStylingProps = {
  style: bodyStyle,
  iconStyle: bodyIconStyle,
  icon: bodyIcon,
  iconSize: bodyIconSize,
  contentStyle: bodyContentStyle
}

export const modalBodyProps = {
  content: {
    type: definePropType<string>(String),
    default: ''
  },
  ...modalBodyStylingProps
}

export type ModalBodyProps = ExtractPublicPropTypes<typeof modalBodyProps>

export const ModalBody = defineComponent({
  name: 'ModalBody',
  props: modalBodyProps,
  setup(props, { slots }) {
    return () => (
      <div class={cn({[props.style]: props.style})}>
        <div class={cn({[props.iconStyle]: props.iconStyle})}>
          <Icon name={props.icon} size={props.iconSize} />
        </div>
        <div class={cn({[props.contentStyle]: props.contentStyle})}>
          { slots.content ? slots.content() : props.content }
        </div>
      </div>
    )
  }
})