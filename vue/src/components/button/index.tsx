import { definePropType } from '../../utils'
import { ExtractPublicPropTypes, defineComponent } from 'vue'

import { buttonStyle, buttonVariants } from './styles.css'
import { ButtonSize, ButtonVariant } from './types'

const buttonProps = {
	style: {
		type: String,
		default: buttonStyle
	},
	variants: {
		type: Object,
		default: buttonVariants
	},
	variant: {
		type: definePropType<ButtonVariant>(String),
		default: 'primary'
	},
	size: {
		type: definePropType<ButtonSize>(String),
		default: 'medium'
	},
	whenClick: {
		type: definePropType<(e: Event) => {}>(Function),
		default: () => {}
	}
} as const

export type ButtonProps = ExtractPublicPropTypes<typeof buttonProps>

export const Button = defineComponent({
	name: 'Button',
	props: buttonProps,
	setup(props, {attrs, slots}) {
			return () => (
				<button
					{...attrs}
					class={`
						${props.style}
						${props.variants && props.variants[props.variant]}
						${props.variants && props.variants[props.size]}
					`}
					onClick={props.whenClick}
				>
					{slots.default && slots.default()}
				</button>
			)
	},
})