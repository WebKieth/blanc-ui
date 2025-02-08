import { definePropType } from '../../utils'
import { ExtractPublicPropTypes, defineComponent } from 'vue'

import {
	buttonStyle,
	buttonVariants,
	type ButtonSize,
	type ButtonVariant
} from '@shared/components/button'

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
	disabled: {
		type: definePropType<boolean>(Boolean),
		default: false
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
						${(props.variants && !props.disabled) && props.variants[props.variant]}
						${props.variants && props.variants[props.size]}
						${props.disabled && `${props.variants.disabled} ${props.variants[`disabled_${props.variant}`]}`}
					`}
					disabled={props.disabled}
					onClick={(e: Event) => !props.disabled && props.whenClick(e)}
				>
					{slots.default && slots.default()}
				</button>
			)
	},
})