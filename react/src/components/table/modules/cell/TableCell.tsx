import { ColumnKey } from "../../../../../../shared/components/table/types";
import { FC, ReactNode } from "react";
import cn from 'classnames';
import { TableCellStylingProps } from "../../types";
import { tableCellStyle, tableCellVariants } from "../../../../../../shared/components/table/cell/styles.css";
import { useTablePropsProvided } from "../../hooks/use-table-props-provided";
import { useTableColStyling } from "../../hooks/use-col-styling";

export type TableCellProps = {
  colKey: ColumnKey
  children?: ReactNode
} & TableCellStylingProps

export const TableCell: FC<TableCellProps> = ({
  cellStyle = tableCellStyle,
  cellVariants = tableCellVariants,
  colKey,
  children = null
}) => {
  const tableProps = useTablePropsProvided()
  const { computeWidth } = useTableColStyling()
  const isHidden = tableProps.hiddenColumnKeys?.includes(colKey)
  return (
    isHidden
      ? <></>
      : <div
        className={cn(
          cellStyle,
          cellVariants[tableProps.size || 'medium']
        )}
        style={{width: computeWidth(colKey)}}
      >
        {children}
      </div>
  )
}