import { defineComponent, ExtractPublicPropTypes, ref } from 'vue'
import { Icon } from '../icon/Icon'
import { CheckboxSizes } from '../../../../shared/components/checkbox/types'
import { definePropType } from '../../utils'
import { IconName } from '../../../../shared/components/icon/types'

import {
	checkboxStyle,
	checkboxFieldStyle,
	checkboxFieldVariants,
	checkboxInputAreaStyle,
	checkboxIconStyle,
	checkboxIconVariants,
	checkboxTextContainerStyle,
	checkboxLabelStyle,
	checkboxLabelVariants,
	checkboxCaptionStyle,
	checkboxCaptionVariants
} from '../../../../shared/components/checkbox'

export const checkboxProps = {
	id: {
		type: String,
		default: ''
	},
	label: {
		type: String,
		default: ''
	},
	caption: {
		type: String,
		default: ''
	},
	value: {
		type: Boolean,
		required: true,
	},
	size: {
		type: definePropType<CheckboxSizes>(String),
		default: 'medium',
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	boxStyle: {
		type: String,
		default: checkboxStyle
	},
	fieldStyle: {
		type: String,
		default: checkboxFieldStyle
	},
	fieldVariants: {
		type: Object,
		default: checkboxFieldVariants
	},
	inputAreaStyle: {
		type: String,
		default: checkboxInputAreaStyle
	},
	iconStyle: {
		type: String,
		default: checkboxIconStyle
	},
	iconVariants: {
		type: Object,
		default: checkboxIconVariants
	},
	textContainerStyle: {
		type: String,
		default: checkboxTextContainerStyle
	},
	labelStyle: {
		type: String,
		default: checkboxLabelStyle
	},
	labelVariants: {
		type: Object,
		default: checkboxLabelVariants
	},
	captionStyle: {
		type: String,
		default: checkboxCaptionStyle
	},
	captionVariants: {
		type: Object,
		default: checkboxCaptionVariants
	},
	checkedIconName: {
		type: definePropType<IconName>(String),
		default: 'ri-check-line'
	},
	uncheckedIconName: {
		type: definePropType<IconName>(String),
		default: 'ri-check-line'
	}
} as const

export type CheckboxProps = ExtractPublicPropTypes<typeof checkboxProps>

export type CheckboxEmitters = {
	change: (value: boolean) => void
}

const checkboxEmitters: CheckboxEmitters = {
	change: (value) =>  typeof value === 'boolean'
}

export const Checkbox = defineComponent({
	name: 'Checkbox',
	components: { Icon },
	props: checkboxProps,
	emits: checkboxEmitters,
	setup(props, { slots, emit }) {
		const inputRef = ref<HTMLInputElement>()
		const handleChange = () => {
			if (!inputRef.value) return
			const { checked } = inputRef.value
			emit('change', checked)
		}

		const onKeyDownHandler = (e: KeyboardEvent) => {
			if (e.key === 'Enter') handleChange()
		}

		return () => (
			<div
				class={props.boxStyle}
			>
				<div
					tabindex={0}
					class={`
						${props.fieldStyle}
						${props.fieldVariants[props.size]}
						${props.disabled && props.fieldVariants.disabled}
						${props.value
							? props.fieldVariants.checked
							: props.fieldVariants.unchecked}
					`}
					onKeydown={onKeyDownHandler}
				>
					<input
						ref={inputRef}
						type="checkbox"
						class={props.inputAreaStyle}
						id={props.id}
						value={props.value}
						disabled={props.disabled}
						onChange={handleChange}
						tabindex={-1}
					/>
					<Icon
						class={`
							${props.iconStyle}
							${props.iconVariants[props.size]}
							${props.disabled && props.iconVariants.disabled}
							${props.value
								? props.iconVariants.checked
								: props.iconVariants.unchecked
							}
						`}
						name={props.value ? props.checkedIconName : props.uncheckedIconName}
					/>
				</div>
				<div class={props.textContainerStyle}>
					{(props.label || props.caption) ?
						<>
							{props.label &&
								<label
									class={`
										${props.labelStyle}
										${props.labelVariants[props.size]}
										${props.disabled && props.labelVariants.disabled}
										${props.value
											? props.labelVariants.checked
											: props.labelVariants.unchecked
										}
									`}
									for={props.id}
								>
									{props.label}
								</label>
							}
							{props.caption &&
								<div
									class={`
										${props.captionStyle}
										${props.captionVariants[props.size]}
										${props.disabled && props.captionVariants.disabled}
										${props.value
											? props.captionVariants.unchecked
											: props.captionVariants.checked
										}
									`}
								>{props.caption}</div>
							}
						</>
						: slots.label &&
							slots.label()
					}
				</div>
				
			</div>
		)
	},
})
