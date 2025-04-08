import { createContext, FC, MouseEventHandler, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import cn from 'classnames';
import {
	tableMainRowStyle,
	tableMainRowVariants,
	tableRowBoxStyle,
	tableRowBoxVariants,
	tableSubRowStyle,
	tableRowActionsStyle,
	tableRowExpanderStyle,
	tableRowExpanderVariants
} from '../../../../../../shared/components/table/row/styles.css';
import { ColumnKey, Row, Rows } from "../../../../../../shared/components/table/types";
import { TableRowStylingProps } from "../../types";
import { useTablePropsProvided } from "../../hooks/use-table-props-provided";
import { TableCell } from "../cell";
import { Checkbox } from "../../../Checkbox";
import { Icon } from "../../../Icon";



export type TableRowProps = {
  rowIndex?: number
  expanded?: boolean
  selected?: boolean
  last?: boolean
  row?: Row<string>
  childNodes?: ReactNode
  subRow?: ReactNode
  nodes?: Rows
  depth?: number
  children?: ReactNode
} & TableRowStylingProps

type TableRowContext = {
  selected: boolean
  nodes: Rows
  depth: number
}

export const TableRowContext = createContext<TableRowContext>({
  selected: false,
  nodes: [],
  depth: 0
})


export const TableRow: FC<TableRowProps> = ({
  rowBoxStyle = tableRowBoxStyle,
  rowBoxVariants = tableRowBoxVariants,
  mainRowStyle = tableMainRowStyle,
  mainRowVariants = tableMainRowVariants,
  subRowStyle = tableSubRowStyle,
  rowActionsStyle = tableRowActionsStyle,
  expanderStyle = tableRowExpanderStyle,
  expanderVariants = tableRowExpanderVariants,
  rowIndex = -1,
  expanded = false,
  selected = undefined,
  last = false,
  row = null,
  children = null,
  childNodes = null,
  subRow = null
}) => {
  const tableProps = useTablePropsProvided()
  const [isExpanded, setIsExpanded] = useState(expanded)
  const isRowExpanded = useMemo(() => isExpanded || expanded, [isExpanded, expanded])
  const toggleExpand: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  const { nodes: parentRowNodes, depth } = useContext(TableRowContext)

  const currentRow = useMemo(() => {
    if (row) return row
    const rows = parentRowNodes.length ? parentRowNodes : tableProps.rows
    return rows?.find((_, index) => index === rowIndex) || null
  }, [row, rowIndex, parentRowNodes, tableProps.rows])

  useEffect(() => setIsExpanded(false), [currentRow])

  const selectable = useMemo(() => Boolean(tableProps.onSelect), [tableProps.onSelect])
  const selectMulti = useMemo(() => selectable && Array.isArray(tableProps.selected), [selectable, tableProps.selected])
  const isRowSelected = useMemo(() => {
    if (selected !== undefined) return selected
    if (Array.isArray(tableProps.selected)) {
      return tableProps.selected.some((item) => item === currentRow?.id)
    } else {
      return tableProps.selected === currentRow?.id
    }
  }, [selected, tableProps.selected, currentRow])

  const handleChangeSelected = () => {
    const currentId = currentRow?.id.toString()
    if (!currentId || !tableProps.onSelect) return
    if (Array.isArray(tableProps.selected)) {
      const selected = tableProps.selected.includes(currentId) 
        ? tableProps.selected.filter(id => id !== currentId) 
        : [...tableProps.selected, currentId]
      tableProps.onSelect(selected)
    } else {
      tableProps.onSelect(tableProps.selected === currentId ? '' : currentId)
    }
  }
  const handleRowClick = () => {
    if (!selectable) return
    handleChangeSelected()
  }

  const expandAvailable = () => childNodes || subRow

  const renderBasicActions = () => (
    <div
      className={rowActionsStyle}
      style={{paddingLeft: `${16 * depth}px`}}
    >
      {selectMulti && currentRow?.id
        ? <Checkbox
          size='medium'
          value={isRowSelected}
          onChange={() => {}}
        />
        : null
      }
      {expandAvailable()
        ? <div
          className={cn(
            expanderStyle,
            selectable && expanderVariants.selectable,
            isRowSelected
              ? expanderVariants.selected
              : expanderVariants.notSelected
          )}
          onClick={toggleExpand}
        >
          <Icon
            name={isRowExpanded ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'}
            size={'small'}
          />
        </div>
        : null
      }
    </div>
  )

  const renderCellContents = (colKey: ColumnKey) => {
    const cellRender = tableProps.renderCell
    const column = tableProps.columns.find((col) => col.key === colKey)
    if (!cellRender || !column || !currentRow) return null
    const fn = cellRender[colKey]
    if (!fn) return null
    return fn(column, currentRow)
  }

  const renderSubRow = () => {
    if (!subRow || !isRowExpanded) return null
    return <div className={subRowStyle}>
      {subRow}
    </div>
  }

  const renderNodes = () => {
    if (!childNodes || !currentRow?.nodes?.length || !isRowExpanded) return null
    if (childNodes) return childNodes
    return currentRow.nodes.map((row, index) => (
      <TableRow
        key={`row-${index}`}
        row={row}
        rowIndex={index}
        expanded={tableProps.expandRows}
        rowBoxStyle={rowBoxStyle}
        rowBoxVariants={rowBoxVariants}
        mainRowStyle={mainRowStyle}
        mainRowVariants={mainRowVariants}
        rowActionsStyle={rowActionsStyle}
        expanderStyle={expanderStyle}
        expanderVariants={expanderVariants}
        last={currentRow?.nodes && index === currentRow.nodes.length - 1}
      />
    ))
  }

  return <TableRowContext.Provider value={{
    selected: isRowSelected,
    nodes: currentRow?.nodes || [],
    depth: depth + 1
  }}>
    <>
      <div
        className={cn(
          rowBoxStyle,
          last && rowBoxVariants.last,
          selectable && rowBoxVariants.selectable,
          isRowSelected
            ? rowBoxVariants.selected
            : rowBoxVariants.notSelected
        )}
        onClick={handleRowClick}
      >
        <div
          className={cn(
            mainRowStyle,
            last && mainRowVariants.last,
            selectable && mainRowVariants.selectable,
            selected
              ? mainRowVariants.selected
              : mainRowVariants.notSelected
          )}
        >
          {tableProps.columns?.length
            ? tableProps.columns.map((column, index) => (
              <TableCell colKey={column.key} key={column.key}>
                {index === 0 ? renderBasicActions() : null}
                {renderCellContents(column.key as ColumnKey)}
              </TableCell>
            ))
            : children
          }
        </div>
        {renderSubRow()}
      </div>
      {renderNodes()}
    </>
  </TableRowContext.Provider>
}