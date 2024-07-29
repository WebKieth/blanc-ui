import { DefineComponent, VNode } from 'vue'

export type ToastView = {
	id: string
	instance: VNode
	destroy: () => void
}

export type NotifyPosition = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight'

export type Roots = Record<NotifyPosition, HTMLDivElement | null>

export type NotifyOptions = Partial<{
	title: string
	summary: string
	position: NotifyPosition
	renderer: {
		component: DefineComponent | null
		props: unknown
	} | null
	autoHide: boolean
	closable: boolean
}>
