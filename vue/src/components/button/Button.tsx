import { definePropType } from '../../utils'
import { ExtractPublicPropTypes, computed, defineComponent, inject, onMounted, ref } from 'vue'

import {
	buttonStyle,
	buttonVariants,
	type ButtonSize,
	type ButtonVariant
} from '../../../../shared/components/button'
import { $buttonGroupProvided, ButtonGroupProps } from '../buttonGroup/ButtonGroup'

export const buttonProps = {
	style: {
		type: String,
		default: buttonStyle
	},
	variants: {
		type: Object,
		default: buttonVariants
	},
	groupKey: {
		type: definePropType<string | number | null>(null),
		default: null
	},
	variant: {
		type: definePropType<ButtonVariant>(String),
		default: 'primary'
	},
	active: {
		type: definePropType<boolean>(Boolean),
		default: false
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
		type: definePropType<(e: Event) => void>(Function),
		default: () => {}
	}
} as const

export type ButtonProps = ExtractPublicPropTypes<typeof buttonProps>

export const Button = defineComponent({
	name: 'Button',
	props: buttonProps,
	setup(props, {attrs, slots}) {
		const groupProps = inject<ButtonGroupProps>($buttonGroupProvided, {})
		const $el = ref()

		const isInGroup = computed(() => Boolean(Object.keys(groupProps).length))

		const isActive = computed(() => props.active || (isInGroup.value && groupProps.value !== null && groupProps.value === props.groupKey))

		const handleClick = (e: Event) => {
			if (props.disabled) return
			if (groupProps?.whenChange && props.groupKey && !isActive.value) {
				groupProps.whenChange(props.groupKey)
			}
			props.whenClick(e)
		}

		const isLast = computed(() => isInGroup.value && !$el.value?.nextElementSibling)
		const isMiddle = computed(() => isInGroup.value && Boolean($el.value?.previousElementSibling && $el.value?.nextElementSibling))
		const isFirst = computed(() => isInGroup.value && !$el.value?.previousElementSibling)

		onMounted(() => {
			console.log($el.value, isLast.value, isMiddle.value, isFirst.value)
		})

		return () => (
			<button
				{...attrs}
				ref={$el}
				class={[
					props.style,
					{
						[props.variants[props.variant] && props.variants[props.variant]]: props.variants && !props.disabled
					},
					{
						[props.variants[props.size] && props.variants[props.size]]: props.variants && props.size
					},
					{
						[props.variants.disabled && props.variants.disabled]: props.variants && props.disabled
					},
					{
						[props.variants.inGroup && props.variants.inGroup]: props.variants && isInGroup.value
					},
					{
						[`${props.variants.disabled && props.variants.disabled} ${props.variants[`${props.variant}_disabled`] && props.variants[`${props.variant}_disabled`]}`]: props.variants && props.disabled
					},
					{
						[`${props.variants.active} ${props.variants[`${props.variant}_active`] && props.variants[`${props.variant}_active`]}`]: props.variants && isActive.value
					},
					{
						[`${props.variants.first} ${props.variants[`${props.variant}_first`] && props.variants[`${props.variant}_first`]}`]: props.variants && isFirst.value
					},
					{
						[`${props.variants.middle} ${props.variants[`${props.variant}_middle`] && props.variants[`${props.variant}_middle`]}`]: props.variants && isMiddle.value
					},
					{
						[`${props.variants.last} ${props.variants[`${props.variant}_last`] && props.variants[`${props.variant}_last`]}`]: props.variants && isLast.value
					},
				]}
				disabled={props.disabled}
				onClick={handleClick}
			>
				{slots.default && slots.default()}
			</button>
		)
	},
})