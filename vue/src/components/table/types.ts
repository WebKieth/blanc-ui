import { ColumnKey, Columns, Rows, Sorting, TableSize } from "../../../../shared/components/table/types"
import { ComputedRef, Ref, Slots } from "vue"

export type Column = {
	key: ColumnKey
	label: string
	sortable?: boolean
	width?: number
}

export type ProvidedTableConfig = {
	props: _TableProps
	slots: Slots
	provided: TableControlsProvided
}
export type WhenSelect = ((ids: string | Array<string>) => void) | null

export type TableRowStylingProps = {
	rowBoxStyle: string
	rowBoxVariants: object
	mainRowStyle: string
	mainRowVariants: object
	subRowStyle: string
	actionsStyle: string
	expanderStyle: string
	expanderVariants: object
}

export type TableCellStylingProps = {
	cellStyle: string
	cellVariants: object
}

export type _TableProps = {
	size: TableSize
	columns: Columns | null
	rows: Rows | null
	expandRows: boolean
	selected: string | Array<string>
	whenSelect: WhenSelect
} & TableRowStylingProps & TableCellStylingProps

export type TableControlsProvided = {
	hiddenColumnKeys: Ref<ColumnKey[]>
	openControls: () => void
}

export type TableHeaderProps = {
	sorting: Sorting
}

export type TableRowProps = {
	nodes: Rows | undefined
	selected: ComputedRef<boolean>
	depth: number
}
