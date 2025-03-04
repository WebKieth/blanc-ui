import { Ref } from "vue"

export type DropdownSize = 'small' | 'medium' | 'large'

export type DropdownAgentScope = {
	opened: Ref<boolean>
	open: () => void
	close: () => void
}

export type DropdownPlacement =
	| 'left'
	| 'left-top'
	| 'left-bottom'
	| 'right'
	| 'right-top'
	| 'right-bottom'
	| 'top'
	| 'top-left'
	| 'top-right'
	| 'bottom'
	| 'bottom-left'
	| 'bottom-right'
