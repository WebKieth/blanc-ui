import { ExtractPublicPropTypes, defineComponent, inject, provide } from 'vue'
import { ProvidedTableConfig, TableControlsProvided, TableEmitters } from './types'
import { defaultTableControlsProvided, tableConfigSymbol, tableControlsProvidedSymbol } from './common'
import { definePropType } from '../../utils'

import { tableStyle } from '../../../../shared/components/table/styles.css'

import {
	TableBody,
} from './modules'
import { tableRowStylingProps } from './modules/row'
import { tableCellStylingProps } from './modules/cell'
import { Columns, Rows, TableSize } from '../../../../shared/components/table/types'

export const tableProps = {
	...tableRowStylingProps,
	...tableCellStylingProps,
	style: {
		type: definePropType<string>(String),
		default: tableStyle
	},
	size: {
		type: definePropType<TableSize>(String),
		default: 'medium',
	},
	columns: {
		type: definePropType<Columns | null>(Array),
		default: null,
	},
	rows: {
		type: definePropType<Rows | null>(Object),
		default: null,
	},
	expandRows: {
		type: definePropType<boolean>(Boolean),
		default: false
	},
	selectable: {
		type: definePropType<boolean>(Boolean),
		default: false
	},
	selected: {
		type: definePropType<string | string[]>(),
		default: '',
		validate: (value: string | string[]) => typeof value === 'string' || Array.isArray(value)
	}
} as const

export type TableProps = ExtractPublicPropTypes<typeof tableProps>

export const tableEmitters: TableEmitters = {
	select: (id) => typeof id === 'string' || Array.isArray(id)
}

export const Table = defineComponent({
	name: 'Table',
	components: { TableBody },
	props: tableProps,
	emits: tableEmitters,
	setup(props, { attrs, slots, emit }) {
		const tableControlsProvided = inject<TableControlsProvided>(tableControlsProvidedSymbol, { ...defaultTableControlsProvided })
		provide<ProvidedTableConfig>(tableConfigSymbol, { props, slots, emit, provided: { ...tableControlsProvided } })
		return () => (
			<table
				{...attrs}
				class={props.style}>
				{slots.header && slots.header()}
				{slots.loading
					? slots.loading()
					: slots.default
						? slots.default()
						: <TableBody />}
				{slots.footer && slots.footer()}
			</table>
		)
	}
})

export { tableStyle }