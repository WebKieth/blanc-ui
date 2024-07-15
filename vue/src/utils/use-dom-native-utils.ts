export const useDomNativeUtils = () => {
	const collectParents = (element: HTMLElement, parents: Array<HTMLElement> = []) => {
		if (element.parentNode === null) {
			return parents
		}
		return collectParents(element.parentNode as HTMLElement, parents.concat([element]))
	}

	const getScrollParent = (node: HTMLElement) => {
		const regex = /(auto|scroll)/

		const style = (_node: HTMLElement, prop: string) => getComputedStyle(_node, null).getPropertyValue(prop)
		const overflow = (_node: HTMLElement) => style(_node, 'overflow') + style(_node, 'overflow-y') + style(_node, 'overflow-x')
		const scroll = (_node: HTMLElement) => regex.test(overflow(_node))

		/* eslint-disable consistent-return */
		const scrollParent = (_node: HTMLElement) => {
			if (!(_node instanceof HTMLElement)) {
				return
			}

			const ps = collectParents(_node.parentNode as HTMLElement, [])

			for (let i = 0; i < ps.length; i += 1) {
				if (scroll(ps[i])) {
					return ps[i]
				}
			}

			return document.scrollingElement || document.documentElement
		}

		return scrollParent(node) as HTMLElement
	}

	return {
		collectParents,
		getScrollParent,
	}
}
