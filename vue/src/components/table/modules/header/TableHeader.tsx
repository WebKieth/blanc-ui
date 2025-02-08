import { ExtractPublicPropTypes, defineComponent, inject, provide } from 'vue'
import { definePropType } from '../../../../utils'
import { TableHeaderCell } from '../headerCell/TableHeaderCell'
import { ProvidedTableConfig } from '../../types'
import { tableConfigSymbol, tableHeaderPropsSymbol, defaultProvidedTableOptions } from '../../common'
import {
	tableHeaderStyle,
	tableHeaderVariants
} from '@shared/components/table/header/styles.css'
import { ColumnKey, Sorting } from '@shared/components/table/types'


export const tableHeaderProps = {
	style: {
		type: String,
		default: tableHeaderStyle
	},
	variants: {
		type: Object,
		default: tableHeaderVariants
	},
	sorting: {
		type: definePropType<Sorting | null>(Object),
		default: null,
	},
	colKey: {
		type: definePropType<ColumnKey>(String),
		default: ''
	},
	whenChangeSort: {
		type: definePropType<(colKey: string, newSortValue: Sorting['value']) => void>(Function),
		default: () => () => {}
	}
} as const

export type TableHeaderProps = ExtractPublicPropTypes<typeof tableHeaderProps>

export const TableHeader = defineComponent({
	name: 'TableHeader',
	components: { TableHeaderCell },
	props: tableHeaderProps,
	setup(props, { attrs, slots }) {
		provide<TableHeaderProps>(tableHeaderPropsSymbol, props)
		const { props: tableProps } = inject<ProvidedTableConfig>(tableConfigSymbol, { ...defaultProvidedTableOptions })
		return () => (
			<tr
				{...attrs}
				class={`
					${props.style}
					${props.variants[tableProps.size]}
				`}
			>
				{tableProps.columns?.length
					? tableProps.columns.map((column) => (
						typeof slots[column.key] === 'function'
						// @ts-expect-error
							? slots[column.key](column)
							: <TableHeaderCell
									key={column.key}
									colKey={column.key}
									whenChangeSort={props.whenChangeSort}
								>
									{column.label}
								</TableHeaderCell>
					))
					: slots.default && slots.default()
				}
			</tr>
		)
	},
})