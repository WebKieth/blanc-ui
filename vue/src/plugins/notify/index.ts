import { Toast } from '../../components/toast'
import { v4 as uuidv4 } from 'uuid'
import { mount } from '../../utils/mount'
import { App as Application } from 'vue'
import { ToastView, NotifyPosition, Roots, NotifyOptions } from './types'
import { notificatorStyles, notificatorVariants } from './styles.css'

export { type NotifyOptions, type NotifyPosition }

export const $notify = Symbol('notify')
export class Notify {
	app: Application
	roots: Roots = {
		top: null,
		topLeft: null,
		topRight: null,
		bottom: null,
		bottomLeft: null,
		bottomRight: null,
	}
	toasts: ToastView[]
	constructor(app: Application) {

		Object.keys(notificatorVariants).forEach((position) => {
			const pos = position as NotifyPosition
			const possibleRoot = document.querySelector(`.${notificatorVariants[pos]}`)
			if (possibleRoot === null) {
				const root = document.createElement('div')
				root.setAttribute('class', `${notificatorStyles} ${notificatorVariants[pos]}`)
				document.body.appendChild(root)
				this.roots[pos] = root
			} else {
				this.roots[pos] = possibleRoot as HTMLDivElement
			}
		})
		this.toasts = []
		this.app = app
	}
	push(
		options: NotifyOptions = {
			title: '',
			summary: '',
			position: 'bottom',
			renderer: {
				component: null,
				props: null,
			},
		},
	) {
		const autoHide = options.autoHide === undefined ? true : options.autoHide
		const closable = options.closable === undefined ? true : options.closable
		const id = uuidv4()
		const element = document.createElement('div')
		element.classList.add('notify__item')
		element.setAttribute('data-id', id)
		const pos = options.position || 'bottom'
		const root = this.roots[pos]
		if (root === null) {
			// eslint-disable-next-line no-console
			console.warn(`[jet-ui notify] root in position ${pos} isn't set`)
			return
		}
		root.appendChild(element)
		const rendererProps = options.renderer?.props || {
			title: options.title,
			message: options.summary,
		}
		const Component = options.renderer?.component ? options.renderer.component : Toast
		// @ts-expect-error
		const { vNode, destroy } = mount(Component, {
			props: {
				...rendererProps,
				whenClose: closable ? this.remove.bind(this, id) : null,
			},
			element,
			app: this.app,
		})

		this.toasts.push({
			id,
			instance: vNode,
			destroy,
		})
		if (!autoHide) return id
		setTimeout(() => this.remove(id), 5000)
		return id
	}
	remove(id: string) {
		const toast = this.toasts.find((toast) => id === toast.id)
		if (toast === undefined) return
		toast.destroy()
		const idx = this.toasts.findIndex((toast) => id === toast.id)
		this.toasts.splice(idx, 1)
		const element = document.querySelector(`[data-id='${toast.id}']`)
		if (element) element.remove()
	}
}
