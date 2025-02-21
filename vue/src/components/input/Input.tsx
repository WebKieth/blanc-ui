import { definePropType } from '../../utils'
import { ExtractPublicPropTypes, defineComponent, ref } from 'vue'
import { v4 as uuid } from 'uuid'
import {
	inputFieldBoxStyle,
	inputFieldBoxVariants,
	inputFieldStyle,
	inputFieldVariants,
	inputLabelStyle,
	inputLabelVariants,
	inputStyle,
	inputVariants,
	type InputSize,
	type InputValue,
	type InputType,
	type InputId
} from '@shared/components/input'
import { InputEmitters } from '@shared/components/input/types'

export const inputProps = {
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
	id: {
		type: definePropType<InputId>(String),
		default: ''
	},
	type: {
		type: definePropType<InputType>(String),
		default: 'text'
	},
	label: {
		type: definePropType<string>(String),
		default: ''
	},
	value: {
		type: definePropType<InputValue>(String),
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
}

export type InputProps = ExtractPublicPropTypes<typeof inputProps>

export const inputEmitters: InputEmitters = {
	input: (value: string) => typeof value === 'string',
	change: (value: string) => typeof value === 'string'
}

export const Input = defineComponent({
	name: 'Input',
	props: inputProps,
	emits: inputEmitters,
	setup(props, { slots, attrs, emit }) {
		const id = props.id ? props.id : uuid()

		const hover = ref(false)
		const focus = ref(false)

		const handleMouseIn = () => {
			if (props.disabled) return
			hover.value = true
		}
		const handleMouseOut = () => hover.value = false

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
				onMouseenter={handleMouseIn}
				onMouseleave={handleMouseOut}
			>
				{props.label
					? <label
							for={id}
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
								id={id}
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
								onChange={(e: Event) => emit('change', (e.target as HTMLInputElement).value)}
								onInput={(e: Event) => emit('input', (e.target as HTMLInputElement).value)}
							/>
							{slots.postfix && slots.postfix()}
						</div>
				}
			</div>
		)
	}
})
