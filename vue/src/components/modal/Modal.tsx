import { definePropType } from '../../utils/index.ts'
import { ExtractPublicPropTypes, defineComponent } from 'vue'
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
	},
	whenClose: {
		type: definePropType<() => void>(Function),
		default: () => {}
	}
} as const

export type ModalProps = ExtractPublicPropTypes<typeof modalProps>

export const Modal = defineComponent({
	props: modalProps,
	setup(props, { slots, attrs }) {
		return () => (
			<>
				<div
					{...attrs}
					class={props.backdropStyle}
					style={`z-index: ${props.zIndex}`}
				></div>
				<div
					class={props.windowStyle}
					style={`z-index: ${props.zIndex}`}
				>
					{slots.default && slots.default(props.whenClose)}
				</div>
			</>
		)
	}
})