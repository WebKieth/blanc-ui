import { _NotifyOptions, NotifyPosition } from '@shared/plugins/notify/types'
import { DefineComponent, VNode } from 'vue'

export type ToastView = {
	id: string
	instance: VNode
	destroy: () => void
}

export { type NotifyPosition }

export type Roots = Record<NotifyPosition, HTMLDivElement | null>

export type NotifyOptions = _NotifyOptions<{
	component: DefineComponent | null
	props: unknown
} | null>
