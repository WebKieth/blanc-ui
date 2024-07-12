import { ExtractPublicPropTypes, defineComponent, inject, computed } from 'vue'
import { useColStyling } from '../../hooks/use-col-styling'
import { defaultProvidedTableOptions, tableConfigSymbol, tableRowPropsSymbol } from '../../common'
import { ColumnKey, ProvidedTableConfig, TableRowProps } from '../../types'
import { definePropType } from '../../../../utils'

import { tableCellStyle, tableCellVariants } from './styles.css'

export const tableCellProps = {
	style: {
		type: String,
		default: tableCellStyle,
	},
	variants: {
		type: Object,
		default: tableCellVariants,
	},
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
						${props.style}
						${props.variants[tableProps.size]}
						${rowProps.selected.value && props.variants.selected}
					`}
					style={colStyles.value}
				>
					{slots.default && slots.default()}
				</td>
		)
	}
})

export {
	tableCellStyle,
	tableCellVariants
}