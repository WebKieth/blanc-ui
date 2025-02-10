import { defineComponent, ExtractPublicPropTypes, inject, computed, CSSProperties } from 'vue'
import { definePropType } from '../../../../utils'
import { ProvidedTableConfig, TableHeaderProps } from '../../types'
import { defaultProvidedTableOptions, tableConfigSymbol, tableHeaderPropsSymbol } from '../../common'
import { useColStyling } from '../../hooks/use-col-styling'
import {
	tableHeaderCellStyle,
	tableHeaderCellVariants,
	tableHeaderCellIconStyle,
	tableHeaderCellIconVariants,
	tableHeaderCellLabelStyle
} from './index'
import { ColumnKey, Sorting } from '../../../../../../shared/components/table/types'

export const tableHeaderCellProps = {
	style: {
		type: String,
		default: tableHeaderCellStyle
	},
	variants: {
		type: Object,
		default: tableHeaderCellVariants
	},
	labelStyle: {
		type: String,
		default: tableHeaderCellLabelStyle
	},
	iconStyle: {
		type: String,
		default: tableHeaderCellIconStyle
	},
	iconVariants: {
		type: Object,
		default: tableHeaderCellIconVariants
	},
	colKey: {
		type: definePropType<ColumnKey>(String),
		required: true,
	},
	sortable: {
		type: Boolean,
		default: false,
	},
	whenChangeSort: {
		type: definePropType<(colKey: string, newSortValue: Sorting['value']) => void>(Function),
		default: () => () => {}
	}
} as const

export type TableHeaderCellProps = ExtractPublicPropTypes<typeof tableHeaderCellProps>

export const TableHeaderCell = defineComponent({
	name: 'TableHeaderCell',
	props: tableHeaderCellProps,
	setup(props, { attrs, slots }) {
		const headerProps = inject<TableHeaderProps>(tableHeaderPropsSymbol)
		const { props: tableProps, provided: tableControlsProvided } = inject<ProvidedTableConfig>(tableConfigSymbol, { ...defaultProvidedTableOptions })
		const { hiddenColumnKeys } = tableControlsProvided

		const { computeColumnStyles } = useColStyling(tableProps, hiddenColumnKeys)
		const colWidthStyles = computed(() => (
			props.colKey
				? computeColumnStyles(props.colKey)
				: {}
		) as CSSProperties)

		const column = computed(() => tableProps?.columns?.find((column) => column.key === props.colKey))

		const isColumnSortable = computed(() => headerProps?.sorting?.key === props.colKey || (column.value?.sortable ?? props.sortable))

		const isHidden = computed(() => hiddenColumnKeys.value.includes(props.colKey))

		const sort = () => {
			if (!headerProps?.sorting) return
			const { sorting } = headerProps
			let newSortValue: Sorting['value'] = ''
			if (props.colKey === sorting.key) {
				switch (sorting.value) {
					case 'asc':
						newSortValue = 'desc'
						break
					case 'desc':
						newSortValue = ''
						break
					default:
						newSortValue = 'asc'
				}
			} else {
				newSortValue = 'asc'
			}
			props.whenChangeSort(props.colKey, newSortValue)
		}

		const handleSort = () => isColumnSortable.value && sort()

		return (
			isHidden.value
				? <></>
				: <th
					{...attrs}
					class={`
						${props.style}
						${isColumnSortable.value && props.variants.sortable}
					`}
					style={colWidthStyles.value}
					onClick={handleSort}
				>
					<div class={props.labelStyle}>
						{column.value
							? column.value.label
								? <span>{column.value.label}</span>
								: null
							: slots.default
								? slots.default()
								: null
						}
						{(headerProps?.sorting && headerProps?.sorting.key === props.colKey)
							? <span
									class={`
										${props.iconStyle}
										${props.iconVariants[headerProps.sorting.value]}
										${!headerProps?.sorting.value && props.iconVariants.invisible}
									`}
								></span>
							: null
						}
					</div>
				</th>
		)
	}
})


export {
	tableHeaderCellStyle,
	tableHeaderCellVariants,
	tableHeaderCellIconStyle,
	tableHeaderCellIconVariants,
	tableHeaderCellLabelStyle
}