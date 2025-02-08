import { FC, PropsWithChildren } from "react";
import { useTablePropsProvided } from "../../hooks/use-table-props-provided";
import { TableRow } from "../row";
import { TableCell } from "../cell";

export const TableBody: FC<PropsWithChildren> = ({ children }) => {
  const tableProps = useTablePropsProvided()
  const isSelected = (id: string | number) => {
    if (Array.isArray(tableProps.selected)) {
      return tableProps.selected.includes(`${id}`)
    } else {
      return tableProps.selected === id
    }
  }
  return (
    (tableProps.rows && tableProps.columns)
      ? tableProps.rows.map((row, index) => (
        <TableRow
          rowBoxStyle={tableProps.rowBoxStyle}
          rowBoxVariants={tableProps.rowBoxVariants}
          mainRowStyle={tableProps.mainRowStyle}
          mainRowVariants={tableProps.mainRowVariants}
          subRowStyle={tableProps.subRowStyle}
          rowActionsStyle={tableProps.rowActionsStyle}
          expanderStyle={tableProps.expanderStyle}
          expanderVariants={tableProps.expanderVariants}
          key={`row-${index}`}
          rowIndex={index}
          selected={isSelected(row.id)}
          expanded={tableProps.expandRows}
        >
          {tableProps.columns?.length
            ? tableProps.columns.map((column) => (
              <TableCell
                cellStyle={tableProps.cellStyle}
                cellVariants={tableProps.cellVariants}
                key={column.key}
                colKey={column.key}
              >
                {tableProps.renderCell && tableProps.renderCell[column.key] ? tableProps.renderCell[column.key](column, row) : ''}
              </TableCell>
            ))
            : null
          }
        </TableRow>
      ))
      : children
  )
}