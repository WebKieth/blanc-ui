import { definePropType } from '../../utils/index.ts'
import { ExtractPublicPropTypes, defineComponent } from 'vue'
import cn from 'classnames'
import {
	modalBackdropStyle,
	modalWindowStyle
} from './styles.css.ts'

export const modalProps = {
	backdropStyle: {
		type: definePropType<string>(String),
		default: modalBackdropStyle
	},
	windowStyle: {
		type: definePropType<string>(String),
		default: modalWindowStyle
	},
	isCloseByBackdropClick: {
		type: definePropType<boolean>(Boolean),
		default: true
	},
	zIndex: {
		type: definePropType<number>(Number),
		default: 1
	}
} as const

export type ModalProps = ExtractPublicPropTypes<typeof modalProps>

export type ModalEmitters = {
	close: () => void
}

export const modalEmitters = {
	close: () => true
}

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
				></div>
				<div
					class={cn({[props.windowStyle]: props.windowStyle})}
					style={`z-index: ${props.zIndex}`}
				>
					{slots.default &&
						slots.default(
							{ onClose: () => emit('close') }
						)
					}
				</div>
			</>
		)
	}
})