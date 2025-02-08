import { ColumnKey, Sorting } from "@shared/components/table/types";
import { FC, ReactNode } from "react";
import cn from 'classnames';
import { StyleVariants } from "src/components/types";
import { ChangeSortHandler } from "../../types";
import {
	tableHeaderCellStyle,
	tableHeaderCellVariants,
	tableHeaderCellIconStyle,
	tableHeaderCellIconVariants,
	tableHeaderCellLabelStyle
} from '@shared/components/table/headerCell/styles.css'
import { useTablePropsProvided } from "../../hooks/use-table-props-provided";
import { useTableColStyling } from "../../hooks/use-col-styling";

type TableHeaderCellProps = {
  style?: string
  variants?: StyleVariants
  labelStyle?: string
  iconStyle?: string
  iconVariants?: StyleVariants
  colKey: ColumnKey
  sortable?: boolean
  onChangeSort?: ChangeSortHandler
  children: ReactNode
}

export const TableHeaderCell: FC<TableHeaderCellProps> = ({
  style = tableHeaderCellStyle,
  variants = tableHeaderCellVariants,
  labelStyle = tableHeaderCellLabelStyle,
  iconStyle = tableHeaderCellIconStyle,
  iconVariants = tableHeaderCellIconVariants,
  sortable = false,
  onChangeSort = () => {},
  colKey,
  children = null
}) => {
  const { hiddenColumnKeys = [], sorting, columns } = useTablePropsProvided()
  const { computeWidth } = useTableColStyling()
  const isHidden = hiddenColumnKeys.includes(colKey)
  const sort = () => {
    if (!sorting) return
    let newSortValue: Sorting['value'] = ''
    if (colKey === sorting.key) {
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
    onChangeSort(colKey, newSortValue)
  }
  const column = columns.find((col) => col.key === colKey)
  const isColumnSortable = sorting?.key === colKey || (column?.sortable ?? sortable)
  const handleSort = () => isColumnSortable && sort()
  return isHidden
    ? null
    : <th
      className={`${style} ${sortable ? variants.sortable : ''}`}
      style={{width: computeWidth(colKey)}}
      onClick={handleSort}
    >
      <div className={labelStyle}>
        {column
          ? column.label
            ? column.label
            : null
          : children
        }
        {(sorting && sorting.key === colKey)
          ? <span
            className={cn(
              iconStyle,
              sorting.value ? iconVariants[sorting.value] : iconVariants.invisible,
            )}
          ></span>
          : null
        }
      </div>
    </th>
}