import { ColumnKey, Columns, Sorting, TableSize } from "@shared/components/table/types"
import { ReactNode } from "react"
import { StyleVariants } from "../types"


export type ViewportWidths = Record<TableSize, number>
export type Column = {
  key: ColumnKey
  label: string
  width?: number | ViewportWidths
}

export type Rows = Array<Row<string>>
export type Row<K extends ColumnKey> = {
	id: string | number,
	nodes?: Rows
} & Record<K, unknown>


export type CellRenderer = {
  [cell: ColumnKey]: (col: Column, row: Row<string>) => ReactNode
}

export type HeaderCellRenderer = {
  [cell: ColumnKey]: (col: Column) => ReactNode
}

export type ChangeSortHandler = (colKey: ColumnKey, newSortValue: Sorting['value']) => void
export type RowSelectHandler = (ids: string | Array<string>) => void

export type TableRowStylingProps = {
  rowBoxStyle?: string
  rowBoxVariants?: StyleVariants
  mainRowStyle?: string
  mainRowVariants?: StyleVariants
  subRowStyle?: string
  rowActionsStyle?: string
  expanderStyle?: string
  expanderVariants?: StyleVariants
}

export type TableCellStylingProps = {
  cellStyle?: string
  cellVariants?: StyleVariants
}

export type TableProps = {
  style?: string
  size?: TableSize
  columns: Columns
  sorting?: Sorting
  rows?: Rows
  header?: ReactNode
  footer?: ReactNode
  loader?: ReactNode
  renderCell?: CellRenderer
  renderHeaderCell?: HeaderCellRenderer
  hiddenColumnKeys?: ColumnKey[]
  expandRows?: boolean
  selected?: string | Array<string>
  onSelect?: RowSelectHandler
} & TableRowStylingProps & TableCellStylingProps


