import { h, render, App as Application, VNode, DefineComponent } from 'vue'

type MountProps = Partial<{
	props: Record<string, unknown> | null
	element: HTMLElement | null
	app: Application
}>

export const mount = (component: InstanceType<DefineComponent>, { props, element, app }: MountProps = {}) => {
	let el = element

	let vNode: VNode | null = h(component, props)
	if (app && app._context) vNode.appContext = app._context
	if (el) render(vNode, el)
	else if (typeof document !== 'undefined') render(vNode, (el = document.createElement('div')))

	const destroy = () => {
		if (el) render(null, el)
		el = null
		vNode = null
	}

	return {
		vNode,
		destroy,
		el,
	}
}
