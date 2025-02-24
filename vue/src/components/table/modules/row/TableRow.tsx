import { ExtractPublicPropTypes, defineComponent, inject, computed, provide, ref, watch } from 'vue'
import { defaultProvidedTableOptions, tableConfigSymbol, tableRowPropsSymbol } from '../../common'
import { ProvidedTableConfig, TableRowProps as _TableRowProps } from '../../types'
import { TableCell } from '../cell'
import { Checkbox } from '../../../checkbox'
import { Icon } from '../../../icon'
import { definePropType } from '../../../../utils'
import {
	tableMainRowStyle,
	tableMainRowVariants,
	tableRowBoxStyle,
	tableRowBoxVariants,
	tableSubRowStyle,
	tableRowActionsStyle,
	tableRowExpanderStyle,
	tableRowExpanderVariants
} from '../../../../../../shared/components/table/row/styles.css'
import { ColumnKey, Row } from '../../../../../../shared/components/table/types'

export const tableRowStylingProps = {
	rowBoxStyle: {
		type: String,
		default: tableRowBoxStyle
	},
	rowBoxVariants: {
		type: Object,
		default: tableRowBoxVariants
	},
	mainRowStyle: {
		type: String,
		default: tableMainRowStyle
	},
	mainRowVariants: {
		type: Object,
		default: tableMainRowVariants
	},
	subRowStyle: {
		type: String,
		default: tableSubRowStyle
	},
	actionsStyle: {
		type: String,
		default: tableRowActionsStyle
	},
	expanderStyle: {
		type: String,
		default: tableRowExpanderStyle
	},
	expanderVariants: {
		type: Object,
		default: tableRowExpanderVariants
	}
}

export const tableRowProps = {
	...tableRowStylingProps,
	rowIndex: {
		type: definePropType<number>(Number),
		default: -1,
	},
	expanded: {
		type: definePropType<boolean>(Boolean),
		default: false
	},
	selected: {
		type: definePropType<boolean | undefined>(Boolean),
		default: undefined,
	},
	last: {
		type: definePropType<boolean>(Boolean),
		default: false,
	},
	row: {
		type: definePropType<Row<string> | null>(Object),
		default: null
	}
} as const

export type TableRowProps = ExtractPublicPropTypes<typeof tableRowProps>

export const TableRow = defineComponent({
	name: 'TableRow',
	components: { TableCell, Checkbox, Icon },
	props: tableRowProps,
	setup(props, { attrs, slots }) {
		const { props: tableProps, emit: tableEmit ,slots: tableSlots } = inject<ProvidedTableConfig>(tableConfigSymbol, { ...defaultProvidedTableOptions })
		const isExpanded = ref<Boolean>(props.expanded)
		const toggleExpand = (e: Event) => {
			e.stopPropagation()
			isExpanded.value = !isExpanded.value
		}
		watch(() => props.expanded, (newValue) => isExpanded.value = newValue)


		const { nodes: parentRowNodes, depth } = inject<_TableRowProps>(tableRowPropsSymbol, {
			selected: computed(() => false),
			nodes: [],
			depth: 0,
		})

		const currentRow = computed(() => {
			if (props.row) return props.row
			const rows = parentRowNodes?.length ? parentRowNodes : tableProps.rows
			return rows?.find((_, index) => index === props.rowIndex) || null
		})
		const childNodes = computed(() => currentRow.value?.nodes)
		const selectMulti = computed(() => tableProps.selectable && Array.isArray(tableProps.selected))

		const selected = computed(() => {
			if (props.selected !== undefined) return props.selected
			if (Array.isArray(tableProps.selected)) {
				return tableProps.selected.some((item) => item === currentRow.value?.id)
			} else {
				return tableProps.selected === currentRow.value?.id
			}
		})

		watch(currentRow, () => isExpanded.value = false)

		provide<_TableRowProps>(tableRowPropsSymbol, {
			selected,
			nodes: childNodes.value,
			depth: depth + 1,
		})

		const handleChangeSelected = () => {
			const currentId = currentRow.value?.id as string
			if (!currentId || !tableProps.selectable) return
			if (Array.isArray(tableProps.selected)) {
				const selected = tableProps.selected.includes(currentId) 
					? tableProps.selected.filter(id => id !== currentId) 
					: [...tableProps.selected, currentId]
				tableEmit('select', selected)
			} else {
				tableEmit('select', tableProps.selected === currentId ? '' : currentId)
			}
		}

		const handleRowClick = () => {
			if (!tableProps.selectable) return
			handleChangeSelected()
		}

		const getSubRowSlot = () => (slots.subrow ? slots.subrow : tableSlots.subrow)

		const getNodeSlot = () => slots.node

		const hasNodeSlot = () => Boolean(getNodeSlot()) || Boolean(childNodes.value?.length)

		const hasSubRowSlot = () => Boolean(getSubRowSlot())

		const expandAvailable = () => hasNodeSlot() || hasSubRowSlot()

		const renderSubRowSlot = (scope: Row<string> | null) => {
			const slot = getSubRowSlot()
			if (slot === undefined || !isExpanded.value) return null
			else return <div class={props.subRowStyle}>
					{slot(scope)}
			</div>
		}

		const renderNodeSlot = (scope: Row<string> | null) => {
			const slot = getNodeSlot()
			if ( (slot === undefined && !childNodes.value ) || !isExpanded.value) return null
			if (slot !== undefined) return slot(scope)
			return childNodes.value?.map((childNode, index) => (
				<TableRow
					key={`row-${index}`}
					row={childNode}
					rowIndex={index}
					expanded={tableProps.expandRows}
					rowBoxStyle={props.rowBoxStyle}
					rowBoxVariants={props.rowBoxVariants}
					mainRowStyle={props.mainRowStyle}
					mainRowVariants={props.mainRowVariants}
					actionsStyle={props.actionsStyle}
					expanderStyle={props.expanderStyle}
					expanderVariants={props.expanderVariants}
					last={childNodes.value && index === childNodes.value.length - 1}
				/>
			))
		}

		const renderBasicActions = () => (
			<div
				class={props.actionsStyle}
				style={`padding-left: ${16 * depth}px;`}>
				{selectMulti.value && currentRow.value?.id
					? <Checkbox
							size='medium'
							value={selected.value}
						/>
					: null}
				{expandAvailable()
					? <div
							class={`
								${props.expanderStyle}
								${tableProps.selectable && props.expanderVariants.selectable}
								${selected.value
									? props.expanderVariants.selected
									: props.expanderVariants.notSelected
								}
							`}
							onClick={toggleExpand}
						>
						<Icon
							name={isExpanded.value ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'}
							size={'small'}
						/>
					</div>
					: null
				}
			</div>
		)

		const renderTableCellSlot = (key: ColumnKey, scope: Row<string> | null) => {
			const slot = slots[key] ? slots[key] : tableSlots[key]
			if (typeof slot === 'function' && scope) return slot(scope)
			else if (typeof slot === 'function' && !scope) return slot()
			else if (typeof slot !== 'function' && scope) return scope[key]
			return ''
		}

		return () => (
			<>
				<div
					{...attrs}
					class={`
						${props.rowBoxStyle}
						${props.last && props.rowBoxVariants.last}
						${tableProps.selectable && props.rowBoxVariants.selectable}
						${selected.value
							? props.rowBoxVariants.selected
							: props.rowBoxVariants.notSelected
						}
					`}
					onClick={handleRowClick}
				>
					<div
						class={`
							${props.mainRowStyle}
							${props.last && props.mainRowVariants.last}
							${tableProps.selectable && props.mainRowVariants.selectable}
							${selected.value
								? props.mainRowVariants.selected
								: props.mainRowVariants.notSelected
							}
						`}
					>
						{tableProps.columns?.length
							? tableProps.columns.map((column, index) => (
								<TableCell colKey={column.key} key={column.key}>
									{index === 0 ? renderBasicActions() : null}
									{renderTableCellSlot(column.key, currentRow.value)}
								</TableCell>
							))
							: slots.default && slots.default()
						}
					</div>
					{renderSubRowSlot(currentRow.value)}
				</div>
				{renderNodeSlot(currentRow.value)}
			</>
		)
	}
})

export {
	tableMainRowStyle,
	tableMainRowVariants,
	tableRowBoxStyle,
	tableRowBoxVariants,
	tableSubRowStyle,
	tableRowActionsStyle,
	tableRowExpanderStyle,
	tableRowExpanderVariants
}