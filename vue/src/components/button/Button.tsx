import { definePropType } from '../../utils'
import { ExtractPublicPropTypes, computed, defineComponent, inject, ref } from 'vue'
import cn from 'classnames'
import {
	buttonStyle,
	buttonVariants,
	type ButtonSize,
	type ButtonVariant
} from '../../../../shared/components/button'
import { $buttonGroupProvided, ButtonGroupProvided } from '../buttonGroup/ButtonGroup'

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
	}
} as const

export type ButtonProps = ExtractPublicPropTypes<typeof buttonProps>

export type ButtonEmitters = {
	click: (e: Event) => void
}

const buttonEmitters: ButtonEmitters = {
	click: (e) => e?.type === 'click'
}

export const Button = defineComponent({
	name: 'Button',
	props: buttonProps,
	emits: buttonEmitters,
	setup(props, {attrs, slots, emit}) {
		const { props: groupProps, emit: groupEmit } = inject<ButtonGroupProvided>($buttonGroupProvided, { props: {}, emit: () => {} })
		const $el = ref()

		const isInGroup = computed(() => Boolean(Object.keys(groupProps).length))

		const isActive = computed(() => props.active || (isInGroup.value && groupProps.value && groupProps.value === props.groupKey))

		const handleClick = (e: Event) => {
			if (props.disabled) return
			if (props.groupKey && !isActive.value) {
				groupEmit('change', props.groupKey)
			}
			emit('click', e)
		}

		const isLast = computed(() => isInGroup.value && !$el.value?.nextElementSibling)
		const isMiddle = computed(() => isInGroup.value && Boolean($el.value?.previousElementSibling && $el.value?.nextElementSibling))
		const isFirst = computed(() => isInGroup.value && !$el.value?.previousElementSibling)

		return () => (
			<button
				{...attrs}
				ref={$el}
				class={[
					props.style,
					{
						[cn({
							[props.variants[props.variant]]: props.variants[props.variant]
						})]: props.variants && !props.disabled
					},
					{
						[cn({
							[props.variants[props.size]]: props.variants[props.size]
						})]: props.variants && props.size
					},
					{
						[cn({
							[props.variants.disabled]: props.variants.disabled
						})]: props.variants && props.disabled
					},
					{
						[cn({
							[props.variants.inGroup]: props.variants.inGroup
						})]: props.variants && isInGroup.value
					},
					{
						[cn({
							[props.variants.disabled]: props.variants.disabled,
							[props.variants[`${props.variant}_disabled`]]: props.variants[`${props.variant}_disabled`]
						})]: props.variants && props.disabled
					},
					{
						[cn({
							[props.variants.active]: props.variants.active,
							[props.variants[`${props.variant}_active`]]: props.variants[`${props.variant}_active`]
					})]: props.variants && isActive.value
					},
					{
						[cn({
							[props.variants.first]: props.variants.first,
							[props.variants[`${props.variant}_first`]]: props.variants[`${props.variant}_first`]
						})]: props.variants && isFirst.value
					},
					{
						[cn({
							[props.variants.middle]: props.variants.middle,
							[props.variants[`${props.variant}_middle`]]: props.variants[`${props.variant}_middle`]
						})]: props.variants && isMiddle.value
					},
					{
						[cn({
							[props.variants.last]: props.variants.last,
							[props.variants[`${props.variant}_last`]]: props.variants[`${props.variant}_last`]
						})]: props.variants && isLast.value
					}
				]}
				disabled={props.disabled}
				onClick={handleClick}
			>
				{slots.default && slots.default()}
			</button>
		)
	},
})
