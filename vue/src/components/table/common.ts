import { InjectionKey, ref } from 'vue'
import { ProvidedTableConfig, TableHeaderProps, _TableProps, TableRowProps, TableControlsProvided } from './types'
import {
	tableCellStyle,
	tableCellVariants,
	tableMainRowStyle,
	tableMainRowVariants,
	tableRowActionsStyle,
	tableRowBoxStyle,
	tableRowBoxVariants,
	tableRowExpanderStyle,
	tableRowExpanderVariants,
	tableSubRowStyle
} from './modules'

export const STORED_HIDDEN_COL_KEYS = 'blankui_table_hidden_column_keys'

export const tableConfigSymbol = Symbol('table-config') as InjectionKey<ProvidedTableConfig>
export const tableRowPropsSymbol = Symbol('table-row') as InjectionKey<TableRowProps>
export const tableHeaderPropsSymbol = Symbol('table-headers') as InjectionKey<TableHeaderProps>
export const tableControlsProvidedSymbol = Symbol('table-controls') as InjectionKey<TableControlsProvided>
export const defaultTableProps: _TableProps = {
	rowBoxStyle: tableRowBoxStyle,
	rowBoxVariants: tableRowBoxVariants,
	mainRowStyle: tableMainRowStyle,
	mainRowVariants: tableMainRowVariants,
	subRowStyle: tableSubRowStyle,
	actionsStyle: tableRowActionsStyle,
	expanderStyle: tableRowExpanderStyle,
	expanderVariants: tableRowExpanderVariants,
	cellStyle: tableCellStyle,
	cellVariants: tableCellVariants,
	size: 'medium',
	columns: null,
	rows: null,
	expandRows: false,
	selected: '',
	selectable: false
}
export const defaultTableControlsProvided = {
	hiddenColumnKeys: ref([]),
	openControls: () => {}
}
export const defaultProvidedTableOptions = {
	slots: {},
	emit: () => {},
	props: { ...defaultTableProps },
	provided: { ...defaultTableControlsProvided },
}