import { definePropType } from '../../utils/index.ts'
import { ExtractPublicPropTypes, defineComponent } from 'vue'
import cn from 'classnames'
import { modalEmitters, ModalHeader } from './modules/ModalHeader'
import * as modalHeaderStylingProps from './modules/ModalHeader/stylingProps.ts'
import * as modalBodyStylingProps from './modules/ModalBody/stylingProps.ts'
import {
  modalBackdropStyle,
  modalWindowStyle
} from './styles.css.ts'
import { ModalBody } from './modules/ModalBody'


const modalStylingProps = {
  backdropStyle: {
    type: definePropType<string>(String),
    default: modalBackdropStyle
  },
  windowStyle: {
    type: definePropType<string>(String),
    default: modalWindowStyle
  },
}

export const modalProps = {
  title: {
    type: definePropType<string>(String),
    default: ''
  },
  content: {
    type: definePropType<string>(String),
    default: ''
  },
  isCloseByBackdropClick: {
    type: definePropType<boolean>(Boolean),
    default: true
  },
  zIndex: {
    type: definePropType<number>(Number),
    default: 1
  },
  ...modalStylingProps,
  ...modalHeaderStylingProps,
  ...modalBodyStylingProps
} as const

export type ModalProps = ExtractPublicPropTypes<typeof modalProps>



export const Modal = defineComponent({
  props: modalProps,
  emits: modalEmitters,
  setup(props, { slots, attrs, emit }) {
    return () => (
      <>
        <div
          {...attrs}
          class={cn({[props.backdropStyle]: props.backdropStyle})}
          style={`z-index: ${props.zIndex}`}
          onClick={
            props.isCloseByBackdropClick
              ? () => emit('close')
              : undefined
          }
        ></div>
        <div
          class={cn({[props.windowStyle]: props.windowStyle})}
          style={`z-index: ${props.zIndex}`}
        >
          {slots.default
            ? slots.default(
                { onClose: () => emit('close') }
              )
            : <>
              {slots.header
                ? slots.header(
                    { onClose: () => emit('close') }
                  )
                : <ModalHeader
                    title={props.title}
                    style={props.headerStyle}
                    titleStyle={props.headerTitleStyle}
                    buttonStyle={props.headerButtonStyle}
                    buttonSize={props.headerButtonSize}
                    buttonVariant={props.headerButtonVariant}
                    buttonIcon={props.headerButtonIcon}
                    onClose={() => emit('close')}
                  >
                    {{
                      title: slots.title,
                      button: slots.closeButton
                    }}
                  </ModalHeader>
              }
              {slots.body
                ? slots.body(
                    { onClose: () => emit('close') }
                  )
                : <ModalBody
                    content={props.content}
                    icon={props.bodyIcon}
                    iconSize={props.bodyIconSize}
                    style={props.bodyStyle}
                    iconStyle={props.bodyIconStyle}
                    contentStyle={props.bodyContentStyle}
                  >
                    {{
                      content: slots.content
                    }}
                  </ModalBody>
              }
            </>
          }
        </div>
      </>
    )
  }
})