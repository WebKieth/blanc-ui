import { TableSize } from "@shared/components/table/types"
import {
  tableHeaderStyle,
  tableHeaderVariants
} from './index'
import { FC, ReactNode } from "react"
import { useTableColStyling } from "../../hooks/use-col-styling"
import { useTablePropsProvided } from "../../hooks/use-table-props-provided"
import { ChangeSortHandler } from "../../types"
import { TableHeaderCell } from "../headerCell/TableHeaderCell"

type TableHeaderProps = {
  style?: String
  variants?: Record<TableSize, string>
  children?: ReactNode
  onChangeSort?: ChangeSortHandler
}

export const TableHeader: FC<TableHeaderProps> = ({
  style = tableHeaderStyle,
  variants = tableHeaderVariants,
  children = null,
  onChangeSort = () => {}
}) => {
  const { columns, renderHeaderCell } = useTablePropsProvided()
  const { sizeType } = useTableColStyling()
  return <tr
    className={`${style} ${variants[sizeType]}`}
  >
    {columns
      ? columns.map((column) => (
        renderHeaderCell
          ? renderHeaderCell[column.key](column)
          : <TableHeaderCell
            colKey={column.key}
            onChangeSort={onChangeSort}
          >
            {column.label}
          </TableHeaderCell>
      ))
      : children
    }
  </tr>
}