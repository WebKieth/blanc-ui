import { defineComponent, inject } from 'vue'
import { defaultProvidedTableOptions, tableConfigSymbol } from '../../common'
import { ProvidedTableConfig } from '../../types'
import { TableRow } from '../row'
import { TableCell } from '../cell'


export const TableBody = defineComponent({
	name: 'TableBody',
	components: {
		TableRow,
		TableCell,
	},
	setup(_, { slots }) {
		const { props: tableProps, slots: tableSlots } = inject<ProvidedTableConfig>(tableConfigSymbol, { ...defaultProvidedTableOptions })

		const isSelected = (id: string | number) => {
			if (Array.isArray(tableProps.selected)) {
				return tableProps.selected.includes(`${id}`)
			} else {
				return tableProps.selected === id
			}
		}
		return () => (
			(tableProps.rows && tableProps.columns)
				? tableProps.rows.map((row, index) => (
					<TableRow
						rowBoxStyle={tableProps.rowBoxStyle}
						rowBoxVariants={tableProps.rowBoxVariants}
						mainRowStyle={tableProps.mainRowStyle}
						mainRowVariants={tableProps.mainRowVariants}
						subRowStyle={tableProps.subRowStyle}
						actionsStyle={tableProps.actionsStyle}
						expanderStyle={tableProps.expanderStyle}
						expanderVariants={tableProps.expanderVariants}
						key={`row-${index}`}
						rowIndex={index}
						selected={isSelected(row.id)}
						expanded={tableProps.expandRows}
					>
						{tableProps.columns?.length
							? tableProps.columns.map((column) => (
								<TableCell
									cellStyle={tableProps.cellStyle}
									cellVariants={tableProps.cellVariants}
									key={column.key}
									colKey={column.key}>
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