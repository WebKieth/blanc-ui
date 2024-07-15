import { defineComponent, ExtractPublicPropTypes, onBeforeUnmount, onMounted, ref, Teleport, watch } from 'vue'
import { definePropType } from '../../utils'
import { PopoverPlacement, PopoverSize } from './types'
import { useDomNativeUtils } from '../../utils/use-dom-native-utils'
import {
	agentStyle,
	bodyStyle,
	bodyVariants,
	rootStyle
} from './styles.css'

export const dropdownProps = {
	rootStyle: {
		type: String,
		default: rootStyle
	},
	agentStyle: {
		type: String,
		default: agentStyle
	},
	bodyStyle: {
		type: String,
		default: bodyStyle
	},
	bodyVariants: {
		type: Object,
		default: bodyVariants
	},
	gutter: {
		type: Number,
		default: 12
	},
	placement: {
		type: definePropType<PopoverPlacement>(String),
		default: 'bottom'
	},
	size: {
		type: definePropType<PopoverSize>(String),
		default: 'medium'
	}
}

export type DropdownProps = ExtractPublicPropTypes<typeof dropdownProps>

export const Dropdown = defineComponent({
	name: 'Dropdown',
	props: dropdownProps,
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
			const { x: agentX, y, width: agentWidth, height: agentHeight } = (agent.value as HTMLElement).getBoundingClientRect()
			const { scrollTop } = scrollParent || document.documentElement
			const agentY = scrollTop + y
			const { width: bodyWidth, height: bodyHeight } = (body.value as HTMLElement).getBoundingClientRect()

			switch (placement) {
				case 'left':
					body.value.style.left = `${agentX - bodyWidth - gutter}px`
					body.value.style.top = `${agentY + (agentHeight - bodyHeight) / 2}px`
					break
				case 'left-top':
					body.value.style.left = `${agentX - bodyWidth - gutter}px`
					body.value.style.top = `${agentY - bodyHeight + gutter}px`
					break
				case 'left-bottom':
					body.value.style.left = `${agentX - bodyWidth - gutter}px`
					body.value.style.top = `${agentY + agentHeight - gutter}px`
					break
				case 'right':
					body.value.style.left = `${agentX + agentWidth + gutter}px`
					body.value.style.top = `${agentY + (agentHeight - bodyHeight) / 2}px`
					break
				case 'right-top':
					body.value.style.left = `${agentX + agentWidth + gutter}px`
					body.value.style.top = `${agentY - bodyHeight + gutter}px`
					break
				case 'right-bottom':
					body.value.style.left = `${agentX + agentWidth + gutter}px`
					body.value.style.top = `${agentY + agentHeight - gutter}px`
					break
				case 'top':
					body.value.style.top = `${agentY - bodyHeight - gutter}px`
					body.value.style.left = `${agentX + (agentWidth - bodyWidth) / 2}px`
					break
				case 'top-left':
					body.value.style.top = `${agentY - bodyHeight - gutter}px`
					body.value.style.left = `${agentX - bodyWidth + gutter}px`
					break
				case 'top-right':
					body.value.style.top = `${agentY - bodyHeight - gutter}px`
					body.value.style.left = `${agentX + agentWidth - gutter}px`
					break
				case 'bottom':
					body.value.style.top = `${agentY + agentHeight + gutter}px`
					body.value.style.left = `${agentX + (agentWidth - bodyWidth) / 2}px`
					break
				case 'bottom-left':
					body.value.style.top = `${agentY + agentHeight + gutter}px`
					body.value.style.left = `${agentX - bodyWidth + gutter}px`
					break
				case 'bottom-right':
					body.value.style.top = `${agentY + agentHeight + gutter}px`
					body.value.style.left = `${agentX + agentWidth - gutter}px`
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
				const needUpdatePosition = mutationsList.some((mutation) => tree.some((el) => el.isSameNode(mutation.target)))
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

		onMounted(() => {
			setTimeout(() => setPosition())
			observeAndUpdatePosition()
			scrollParent = getScrollParent(root.value as HTMLElement) || document.body
			console.log(scrollParent)
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
				class={props.rootStyle}
			>
				<div
					ref={agent}
					class={props.agentStyle}
					onClick={open}
				>
					{slots.agent && slots.agent()}
				</div>
				<Teleport to='body'>
					<div
						ref={body}
						class={`
							${props.bodyStyle}
							${opened.value && props.bodyVariants.opened}
							${props.bodyVariants[props.size]}
							${props.bodyVariants[props.placement]}
						`}
					>
						{slots.default && slots.default()}
					</div>
				</Teleport>
			</div>
		)
	}
})