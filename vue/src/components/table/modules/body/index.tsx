import { defineComponent, inject } from 'vue'
import { defaultProvidedTableOptions, tableConfigSymbol } from '../../common'
import { ProvidedTableConfig } from '../../types'
import { TableCell, TableRow } from '../index'

export const TableBody = defineComponent({
	name: 'TableBody',
	components: {
		TableRow,
		TableCell,
	},
	setup(_, { slots }) {
		const { props: tableProps, slots: tableSlots } = inject<ProvidedTableConfig>(tableConfigSymbol, { ...defaultProvidedTableOptions })

		const isSelected = (id: string) => {
			if (Array.isArray(tableProps.selected)) {
				return tableProps.selected.includes(id)
			} else {
				return tableProps.selected === id
			}
		}
		return () => (
			(tableProps.rows && tableProps.columns)
				? tableProps.rows.map((row, index) => (
					<TableRow
						key={`row-${index}`}
						rowIndex={index}
						selected={isSelected(row.id as string)}
						expanded={tableProps.expandRows}
					>
						{tableProps.columns?.length
							? tableProps.columns.map((column) => (
								<TableCell key={column.key} colKey={column.key}>
									{/*@ts-expect-error */}
									{tableSlots[column.key]({ column, row })}
								</TableCell>
							))
							: null
						}
					</TableRow>
				))
				: slots.default && slots.default()
			
		)
	}
})