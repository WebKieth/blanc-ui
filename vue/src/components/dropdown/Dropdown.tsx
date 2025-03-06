import { defineComponent, ExtractPublicPropTypes, onBeforeUnmount, onMounted, ref, SlotsType, StyleValue, Teleport, VNodeChild, watch } from 'vue'
import cn from 'classnames'
import { definePropType } from '../../utils'
import { DropdownPlacement, DropdownSize, DropdownAgentScope } from './types'
import { useDomNativeUtils } from '../../utils/use-dom-native-utils'
import {
	dropdownAgentStyle,
	dropdownBodyStyle,
	dropdownBodyVariants,
	dropdownRootStyle
} from './styles.css'

export const dropdownProps = {
	rootStyle: {
		type: String,
		default: dropdownRootStyle
	},
	agentStyle: {
		type: String,
		default: dropdownAgentStyle
	},
	bodyStyle: {
		type: String,
		default: dropdownBodyStyle
	},
	bodyVariants: {
		type: Object,
		default: dropdownBodyVariants
	},
	bodyStyleRules: {
		type: definePropType<StyleValue>(Object),
		default: undefined
	},
	gutter: {
		type: Number,
		default: 12
	},
	placement: {
		type: definePropType<DropdownPlacement>(String),
		default: 'bottom'
	},
	size: {
		type: definePropType<DropdownSize>(String),
		default: 'medium'
	}
}

export type DropdownProps = ExtractPublicPropTypes<typeof dropdownProps>

export const dropdownSlots: SlotsType<{
	agent: (props: DropdownAgentScope) => VNodeChild | undefined
	default: (props: DropdownAgentScope) => VNodeChild | undefined
}> = {}

export const Dropdown = defineComponent({
	name: 'Dropdown',
	props: dropdownProps,
	slots: dropdownSlots,
	setup(props, { slots }) {
		const { collectParents, getScrollParent } = useDomNativeUtils()
		let scrollParent: HTMLElement | null = null
		const agent = ref<HTMLElement | null>(null)
		const body = ref<HTMLElement | null>(null)
		const root = ref<HTMLElement | null>(null)

		let observer: MutationObserver | null = null

		const opened = ref<boolean>(false)
		const open = () => {
			opened.value = true
		}
		const close = () => {
			opened.value = false
		}

		const setPosition = (placement = props.placement) => {
			if (!agent.value || !body.value) return
			const { gutter } = props
			const { x: agentX, y: agentY, width: agentWidth, height: agentHeight } = (agent.value as HTMLElement).getBoundingClientRect()
			const { width: bodyWidth, height: bodyHeight } = (body.value as HTMLElement).getBoundingClientRect()
			const { clientHeight: docClientHeight, clientWidth: docClientWidth } = document.body
			let leftOffset
			let topOffset
			switch (placement) {
				case 'left':
					leftOffset = agentX - bodyWidth - gutter
					topOffset = agentY + (agentHeight - bodyHeight) / 2
					if (leftOffset < 0) {
						setPosition('right')
						break
					}
					body.value.style.left = `${leftOffset}px`
					body.value.style.top = `${topOffset}px`
					break

				case 'left-top':
					leftOffset = agentX - bodyWidth - gutter
					topOffset = agentY - bodyHeight + gutter
					if (leftOffset < 0) {
						setPosition('right-top')
						break
					}
					if (topOffset < 0) {
						setPosition('left-bottom')
						break
					}
					body.value.style.left = `${leftOffset}px`
					body.value.style.top = `${topOffset}px`
					break

				case 'left-bottom':
					leftOffset = agentX - bodyWidth - gutter
					topOffset = agentY + agentHeight - gutter
					if (leftOffset < 0) {
						setPosition('right-bottom')
						break
					}
					if (topOffset > docClientHeight) {
						setPosition('left-top')
						break
					}
					body.value.style.left = `${leftOffset}px`
					body.value.style.top = `${topOffset}px`
					break

				case 'right':
					leftOffset = agentX + agentWidth + gutter
					topOffset = agentY + (agentHeight - bodyHeight) / 2
					if (leftOffset > docClientWidth) {
						setPosition('left')
						break
					}
					body.value.style.left = `${leftOffset}px`
					body.value.style.top = `${topOffset}px`
					break

				case 'right-top':
					leftOffset = agentX + agentWidth + gutter
					topOffset = agentY - bodyHeight + gutter
					if (leftOffset > docClientWidth) {
						setPosition('left-top')
						break
					}
					if (topOffset < 0) {
						setPosition('right-bottom')
						break
					}
					body.value.style.left = `${leftOffset}px`
					body.value.style.top = `${topOffset}px`
					break

				case 'right-bottom':
					leftOffset = agentX + agentWidth + gutter
					topOffset = agentY + agentHeight - gutter
					if (leftOffset > docClientWidth) {
						setPosition('left-bottom')
						break
					}
					if (topOffset > docClientHeight) {
						setPosition('right-top')
						break
					}
					body.value.style.left = `${leftOffset}px`
					body.value.style.top = `${topOffset}px`
					break

				case 'top':
					topOffset = agentY - bodyHeight - gutter
					leftOffset = agentX + (agentWidth - bodyWidth) / 2
					if (topOffset < 0) {
						setPosition('bottom')
						break
					}
					body.value.style.top = `${topOffset}px`
					body.value.style.left = `${leftOffset}px`
					break

				case 'top-left':
					leftOffset = agentX - bodyWidth + gutter
					topOffset = agentY - bodyHeight - gutter
					if (leftOffset < 0) {
						setPosition('top-right')
						break
					}
					if (topOffset < 0) {
						setPosition('bottom-left')
						break
					}
					body.value.style.top = `${topOffset}px`
					body.value.style.left = `${leftOffset}px`
					break

				case 'top-right':
					leftOffset = agentX + agentWidth - gutter
					topOffset = agentY - bodyHeight - gutter
					if (topOffset < 0) {
						setPosition('bottom-right')
						break
					}
					if (leftOffset > docClientWidth) {
						setPosition('top-left')
						break
					}
					body.value.style.top = `${topOffset}px`
					body.value.style.left = `${leftOffset}px`
					break

				case 'bottom':
					topOffset = agentY + agentHeight + gutter
					leftOffset = agentX + (agentWidth - bodyWidth) / 2
					if (topOffset > docClientHeight) {
						setPosition('top')
						break
					}
					body.value.style.top = `${topOffset}px`
					body.value.style.left = `${leftOffset}px`
					break
				case 'bottom-left':
					topOffset = agentY + agentHeight + gutter
					leftOffset = agentX - bodyWidth + gutter
					if (topOffset > docClientHeight) {
						setPosition('top-left')
						break
					}
					if (leftOffset < 0) {
						setPosition('bottom-right')
						break
					}
					body.value.style.top = `${topOffset}px`
					body.value.style.left = `${leftOffset}px`
					break
				case 'bottom-right':
					topOffset = agentY + agentHeight + gutter
					leftOffset = agentX + agentWidth - gutter
					if (topOffset > docClientHeight) {
						setPosition('top-right')
						break
					}
					if (leftOffset > docClientWidth) {
						setPosition('bottom-left')
						break
					}
					body.value.style.top = `${topOffset}px`
					body.value.style.left = `${leftOffset}px`
					break
			}
		}

		const trackOutsideClick = (event: Event, callback = () => {}) => {
			if (opened.value === false) return
			const tree = collectParents(event.target as HTMLElement)
			const isOutsideClick = !tree.some((el) => el.isSameNode(body.value) || el.isSameNode(agent.value)) === true
			if (isOutsideClick === false) return
			callback()
		}

		const handleOutsideClick = (event: Event) => {
			trackOutsideClick(event, () => close())
		}

		const handleScroll = () => {
			setPosition()
		}

		const handleResize = () => {
			setPosition()
		}

		const observeAndUpdatePosition = () => {
			observer = new MutationObserver((mutationsList) => {
				const tree = collectParents(root.value as HTMLElement)
				const needUpdatePosition = mutationsList
					.some((mutation) =>
						tree.some((el) =>
							el.isSameNode(mutation.target)
						)
					)
				if (needUpdatePosition) {
					setPosition()
				}
			})
			observer.observe((scrollParent || document.body) as Node, {
				subtree: true,
				attributes: true,
			})
		}

		watch(() => props.placement, () => setPosition())
		watch(() => props.bodyStyleRules, () => setTimeout(() => setPosition()))

		onMounted(() => {
			setTimeout(() => setPosition())
			observeAndUpdatePosition()
			scrollParent = getScrollParent(root.value as HTMLElement) || document.body
			document.addEventListener('click', handleOutsideClick)
			scrollParent.addEventListener('scroll', handleScroll)
			window.addEventListener('resize', handleResize)
		})

		onBeforeUnmount(() => {
			document.removeEventListener('click', handleOutsideClick)
			scrollParent?.removeEventListener('scroll', handleScroll)
			window.removeEventListener('resize', handleResize)
			observer?.disconnect()
		})

		return () => (
			<div
				ref={root}
				class={cn({[props.rootStyle]: props.rootStyle})}
			>
				<div
					ref={agent}
					class={cn({[props.agentStyle]: props.agentStyle})}
					onClick={open}
				>
					{slots.agent && slots.agent({ opened, open, close })}
				</div>
				<Teleport to='body'>
					<div
						ref={body}
						style={props.bodyStyleRules}
						class={cn({
							[props.bodyStyle]: props.bodyStyle,
							[props.bodyVariants.opened]: props.bodyVariants.opened && opened.value,
							[props.bodyVariants[props.size]]: props.bodyVariants[props.size] && props.size,
							[props.bodyVariants[props.placement]]: props.bodyVariants[props.placement] && props.placement
						})}
					>
						{slots.default && slots.default({ opened, open, close })}
					</div>
				</Teleport>
			</div>
		)
	}
})
