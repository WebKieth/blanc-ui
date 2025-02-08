import { createContext, FC, PropsWithChildren } from "react";
import { TableProps } from "./types";
import { tableStyle } from "@shared/components/table/styles.css";
import {
  tableMainRowStyle,
  tableMainRowVariants,
  tableRowBoxStyle,
  tableRowBoxVariants,
  tableSubRowStyle,
  tableRowActionsStyle,
  tableRowExpanderStyle,
  tableRowExpanderVariants
} from './modules/row'
import { TableBody } from "./modules/body";
import { tableCellStyle, tableCellVariants } from "./modules/cell";

export const TablePropsContext = createContext<TableProps>({
  columns: [],
  hiddenColumnKeys: []
});

export const Table: FC<PropsWithChildren<TableProps>> = ({
  style = tableStyle,
  size = 'medium',
  columns,
  sorting,
  rows = [],
  header = null,
  footer = null,
  children = null,
  loader,
  renderCell,
  renderHeaderCell,
  hiddenColumnKeys = [],
  expandRows = false,
  selected,
  onSelect,
  rowBoxStyle = tableRowBoxStyle,
  rowBoxVariants = tableRowBoxVariants,
  mainRowStyle = tableMainRowStyle,
  mainRowVariants = tableMainRowVariants,
  subRowStyle = tableSubRowStyle,
  rowActionsStyle = tableRowActionsStyle,
  expanderStyle = tableRowExpanderStyle,
  expanderVariants = tableRowExpanderVariants,
  cellStyle = tableCellStyle,
  cellVariants = tableCellVariants
}) => {

  return (
    <TablePropsContext.Provider value={{
      size,
      columns,
      rows,
      renderCell,
      renderHeaderCell,
      hiddenColumnKeys,
      sorting,
      expandRows,
      selected,
      onSelect,
      rowBoxStyle,
      rowBoxVariants,
      mainRowStyle,
      mainRowVariants,
      subRowStyle,
      rowActionsStyle,
      expanderStyle,
      expanderVariants,
      cellStyle,
      cellVariants
    }}>
      <div className={style}>
        {header}
        {loader
          ? loader
          : children
            ? children
            : <TableBody />}
        {footer}
      </div>
    </TablePropsContext.Provider>
  );
};
