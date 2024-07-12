import { InjectionKey, ref } from 'vue'
import { ProvidedTableConfig, TableHeaderProps, _TableProps, TableRowProps, TableControlsProvided } from './types'

export const STORED_HIDDEN_COL_KEYS = 'blankui_table_hidden_column_keys'

export const tableConfigSymbol = Symbol('table-config') as InjectionKey<ProvidedTableConfig>
export const tableRowPropsSymbol = Symbol('table-row') as InjectionKey<TableRowProps>
export const tableHeaderPropsSymbol = Symbol('table-headers') as InjectionKey<TableHeaderProps>
export const tableControlsProvidedSymbol = Symbol('table-controls') as InjectionKey<TableControlsProvided>
export const defaultTableProps: _TableProps = {
	size: 'medium',
	columns: null,
	rows: null,
	expandRows: false,
	selected: '',
	whenSelect: null
}
export const defaultTableControlsProvided = {
	hiddenColumnKeys: ref([]),
	openControls: () => {}
}
export const defaultProvidedTableOptions = {
	slots: {},
	props: { ...defaultTableProps },
	provided: { ...defaultTableControlsProvided },
}