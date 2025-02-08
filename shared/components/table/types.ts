export type Columns = Array<Column>
export type ColumnKey = string
export type Column = {
	key: ColumnKey
	label: string
	sortable?: boolean
	width?: number
}

export type Rows = Array<Row<string>>
export type Row<K extends ColumnKey> = {
	id: string | number,
	nodes?: Rows
} & Record<K, unknown>

export type Sorting = {
	key: ColumnKey
	value: 'asc' | 'desc' | ''
}

export type TableSize = 'small' | 'medium' | 'large'