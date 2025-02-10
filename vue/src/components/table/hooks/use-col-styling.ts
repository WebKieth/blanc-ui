import { Ref, computed } from 'vue'
import { _TableProps } from '../types'
import { ColumnKey, TableSize } from '../../../../../shared/components/table/types'


export const useColStyling = (props: _TableProps, hiddenColumnKeys: Ref<ColumnKey[]>) => {

	const { clientWidth } = document.documentElement;
	const isHidden = (key: ColumnKey) => (
		hiddenColumnKeys.value.includes(key)
	)

	const columnsWithWidth = computed(() => {
		return props.columns?.filter((item) => item.width && !isHidden(item.key))
	})

	const sizeType: TableSize =
	clientWidth < 1440 ? 'small' : clientWidth >= 1440 && clientWidth < 1900 ? 'medium' : 'large';

	const computeWidth = (colKey: ColumnKey) => {
		const DEFAULT = 'auto'
		if (!props.columns?.length) return DEFAULT
		const column = props.columns?.find((col) => col.key === colKey)
		const FULL_WIDTH = 100
		if (hiddenColumnKeys.value.length) {
			if (isHidden(colKey)) return '0%'
			const hiddenColumns = props.columns.filter((col) => isHidden(col.key))
			const hiddenWidth = hiddenColumns.reduce((acc, current) => current.width ? acc + current.width : acc, 0)
			const coefficient = FULL_WIDTH / (FULL_WIDTH - hiddenWidth)
			return column?.width
				? `${column.width * coefficient}%`
				: `0%`
		}
		const fullWidths = columnsWithWidth.value?.reduce((acc, col) =>  col.width ? acc + (col.width as number) : 0, 0)
		if (!column || !fullWidths) return DEFAULT
		if (column.width) {
			const width = (column.width * FULL_WIDTH) / fullWidths
			return `${width}%`
		}
		let remainder = fullWidths
		columnsWithWidth.value?.forEach((item) => {
			if (!item.width) return
			remainder = remainder - item.width
		})
		return `${remainder / (props.columns.length - (columnsWithWidth.value ? columnsWithWidth.value.length : 0))}%`
	}


	const computeColumnStyles = (colKey: ColumnKey) => ({
		width: computeWidth(colKey),
	})

	return {
		sizeType,
		columnsWithWidth,
		computeColumnStyles,
	}
}
