import { definePropType } from '../../utils'
import { ExtractPublicPropTypes, defineComponent } from 'vue'
import {
	modalBackdropStyle,
	modalWindowStyle
} from './styles.css.ts'

const modalProps = {
	backdropStyle: {
		type: definePropType<string>(String),
		default: modalBackdropStyle
	},
	windowStyle: {
		type: definePropType<string>(String),
		default: modalWindowStyle
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
					style={props.backdropStyle}
				></div>
				<div
					style={props.windowStyle}
				>
					{slots.default && slots.default(props.whenClose)}
				</div>
			</>
		)
	}
})

export {
	modalBackdropStyle,
	modalWindowStyle
}