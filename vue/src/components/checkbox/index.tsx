import { defineComponent, ExtractPublicPropTypes } from 'vue'
import { Icon } from '../icon'
import { CheckboxSizes } from './types'
import { definePropType } from '../../utils'
import { IconName } from '../icon/types'

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
} from './styles.css'

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
	whenChange: {
		type: definePropType<(value: boolean) => void>(Function),
		required: true,
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

export const Checkbox = defineComponent({
	name: 'Checkbox',
	components: { Icon },
	props: checkboxProps,
	setup(props, { slots }) {
		const handleWhenChange = (e: Event) => {
			const checked = (e.target as HTMLInputElement).checked
			props.whenChange(checked)
		}

		const onKeyDownHandler = (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				handleWhenChange(e)
			}
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
						type="checkbox"
						class={props.inputAreaStyle}
						id={props.id}
						value={props.value}
						disabled={props.disabled}
						onChange={handleWhenChange}
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

export {
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
}