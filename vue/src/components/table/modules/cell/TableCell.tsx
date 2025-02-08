import { ExtractPublicPropTypes, defineComponent, inject, computed } from 'vue'
import { useColStyling } from '../../hooks/use-col-styling'
import { defaultProvidedTableOptions, tableConfigSymbol, tableRowPropsSymbol } from '../../common'
import { ProvidedTableConfig, TableRowProps } from '../../types'
import { definePropType } from '../../../../utils'
import { tableCellStyle, tableCellVariants } from '@shared/components/table/cell/styles.css'
import { ColumnKey } from '@shared/components/table/types'

export const tableCellStylingProps = {
	cellStyle: {
		type: String,
		default: tableCellStyle,
	},
	cellVariants: {
		type: Object,
		default: tableCellVariants,
	},
}

export const tableCellProps = {
	...tableCellStylingProps,
	colKey: {
		type: definePropType<ColumnKey>(String),
		default: ''
	}
} as const

export type TableCellProps = ExtractPublicPropTypes<typeof tableCellProps>

export const TableCell = defineComponent({
	name: 'TableCell',
	props: tableCellProps,
	setup(props, { attrs, slots }) {
		const { props: tableProps, provided: tableControlsProvided } = inject<ProvidedTableConfig>(tableConfigSymbol, { ...defaultProvidedTableOptions })
		const { hiddenColumnKeys } = tableControlsProvided
		console.log(tableProps, props)
		const rowProps = inject<TableRowProps>(tableRowPropsSymbol, {
			selected: computed(() => false),
			nodes: [],
			depth: 0
		})
		const { computeColumnStyles } = useColStyling(tableProps, hiddenColumnKeys)
		const colStyles = computed(() => (
			props.colKey
				? computeColumnStyles(props.colKey)
				: {}
		))
		const isHidden = computed(() => hiddenColumnKeys.value.includes(props.colKey))
		return () => (
			isHidden.value
				? <></>
				: <td
					{...attrs}
					class={`
						${props.cellStyle}
						${props.cellVariants[tableProps.size]}
						${rowProps.selected.value && props.cellVariants.selected}
					`}
					style={colStyles.value}
				>
					{slots.default && slots.default()}
				</td>
		)
	}
})