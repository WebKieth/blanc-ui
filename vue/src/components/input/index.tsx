import { definePropType } from '../../utils'
import { ExtractPublicPropTypes, defineComponent, ref } from 'vue'
import { Emitter, InputSize, InputType } from './types'
import {
	inputFieldBoxStyle,
	inputFieldBoxVariants,
	inputFieldStyle,
	inputFieldVariants,
	inputLabelStyle,
	inputLabelVariants,
	inputStyle,
	inputVariants
} from './styles.css'

const inputProps = {
	style: {
		type: String,
		default: inputStyle
	},
	variants: {
		type: Object,
		default: inputVariants
	},
	labelStyle: {
		type: String,
		default: inputLabelStyle
	},
	labelVariants: {
		type: Object,
		default: inputLabelVariants
	},
	fieldBoxStyle: {
		type: String,
		default: inputFieldBoxStyle
	},
	fieldBoxVariants: {
		type: Object,
		default: inputFieldBoxVariants
	},
	fieldStyle: {
		type: String,
		default: inputFieldStyle
	},
	fieldVariants: {
		type: Object,
		default: inputFieldVariants
	},
	type: {
		type: definePropType<InputType>(String),
		default: 'string'
	},
	label: {
		type: definePropType<string>(String),
		default: ''
	},
	value: {
		type: definePropType<string | number>(String),
		default: ''
	},
	disabled: {
		type: definePropType<boolean>(Boolean),
		default: false
	},
	size: {
		type: definePropType<InputSize>(String),
		default: 'medium'
	},
	whenChange: {
		type: definePropType<Emitter>(Function),
		default: () => {}
	},
	whenInput: {
		type: definePropType<Emitter>(Function),
		default: () => {}
	}
}

export type InputProps = ExtractPublicPropTypes<typeof inputProps>

export const Input = defineComponent({
	name: 'Input',
	props: inputProps,
	setup(props, { slots, attrs }) {
		const hover = ref(false)
		const focus = ref(false)

		const handleFocus = () => {
			if (props.disabled) return
			focus.value = true
		}
		const handleBlur = () => focus.value = false

		return () => (
			<div
				{...attrs}
				class={`
					${props.style}
					${props.variants[props.size]}
					${props.disabled && props.variants.disabled}
					${hover.value && props.variants.hover}
					${focus.value && props.variants.focus}
				`}
			>
				{props.label
					? <label
							class={`
								${props.labelStyle}
								${props.labelVariants[props.size]}
								${props.disabled && props.labelVariants.disabled}
								${hover.value && props.labelVariants.hover}
								${(focus.value || props.value) && props.labelVariants.focus}
							`}
						>
						{props.label}
					</label>
					: slots.label && slots.label()
				}
				{slots.default
					? slots.default({
							hover,
							focus,
							handleFocus,
							handleBlur
						})
					: 
						<div
							class={`
								${props.fieldBoxStyle}
								${props.fieldBoxVariants[props.size]}
								${props.disabled && props.fieldBoxVariants.disabled}
								${hover.value && props.fieldBoxVariants.hover}
								${focus.value && props.fieldBoxVariants.focus}
							`}
						>
							{slots.prefix && slots.prefix()}
							<input
								class={`
									${props.fieldStyle}
									${props.fieldVariants[props.size]}
									${props.disabled && props.fieldVariants.disabled}
									${hover.value && props.fieldVariants.hover}
									${focus.value && props.fieldVariants.focus}
								`}
								type={props.type}
								value={props.value}
								onFocus={handleFocus}
								onBlur={handleBlur}
								onChange={(e: Event) => props.whenChange((e.target as HTMLInputElement).value)}
								onInput={(e: Event) => props.whenInput((e.target as HTMLInputElement).value)}
							/>
							{slots.postfix && slots.postfix()}
						</div>
				}
			</div>
		)
	}
})
export {
	inputFieldBoxStyle,
	inputFieldBoxVariants,
	inputFieldStyle,
	inputFieldVariants,
	inputLabelStyle,
	inputLabelVariants,
	inputStyle,
	inputVariants
}