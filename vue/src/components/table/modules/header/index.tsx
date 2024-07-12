import { ExtractPublicPropTypes, computed, defineComponent, inject, provide } from 'vue'
import { definePropType } from '../../../../utils'
import { TableHeaderCell } from '../header-cell'
import { ColumnKey, Sorting, ProvidedTableConfig } from '../../types'
import { tableConfigSymbol, tableHeaderPropsSymbol, defaultProvidedTableOptions } from '../../common'
import { useColStyling } from '../../hooks/use-col-styling'
import {
	tableHeaderStyle,
	tableHeaderVariants
} from './styles.css'


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
		// type: Object as PropType<Sorting> | null,
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
		const { props: tableProps, provided: tableControlsProvided } = inject<ProvidedTableConfig>(tableConfigSymbol, { ...defaultProvidedTableOptions })
		const { computeColumnStyles } = useColStyling(tableProps, tableControlsProvided.hiddenColumnKeys)
		const colWidthStyles = computed(() => (
			props.colKey
				? computeColumnStyles(props.colKey)
				: {}
		))

		return () => (
			<tr
				{...attrs}
				style={colWidthStyles.value}
				class={`
					${props.style}
					${props.variants[tableProps.size]}
				`}
			>
				{tableProps.columns?.length
					? tableProps.columns.map((column) => (
						typeof slots[column.key] === 'function'
						//@ts-expect-error ts is dumby
							? slots[column.key](column)
							: <TableHeaderCell
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

export {
	tableHeaderStyle,
	tableHeaderVariants
}