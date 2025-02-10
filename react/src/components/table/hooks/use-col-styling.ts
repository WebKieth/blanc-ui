import { Column, ColumnKey, TableSize } from "../../../../../shared/components/table/types";
import { useTablePropsProvided } from "./use-table-props-provided";

export const useTableColStyling = () => {
  const { columns, hiddenColumnKeys = [] } = useTablePropsProvided();
  const { clientWidth } = document.documentElement;

  const isHidden = (key: ColumnKey) => (
    hiddenColumnKeys.includes(key)
  )

  const columnsWithWidth = columns.filter((item) => item.width && !isHidden(item.key))

  const sizeType: TableSize =
    clientWidth < 1440 ? 'small' : clientWidth >= 1440 && clientWidth < 1900 ? 'medium' : 'large';

  const computeWidth = (key: ColumnKey) => {
    const DEFAULT = 'auto';
    const FULL_WIDTH = 100;
    if (!columns.length) return DEFAULT;
    const getColWidth = (col: Column) =>
      typeof col.width === 'object' ? col.width[sizeType] : col.width;

    const column = columns.find(col => col.key === key);
    if (hiddenColumnKeys.length) {
      if (isHidden(key)) return '0%';
      const hiddenColumns = columns.filter((col) => isHidden(col.key))
      const hiddenWidth = hiddenColumns.reduce((acc, current) => current.width ? acc + current.width : acc, 0)
      const coefficient = FULL_WIDTH / (FULL_WIDTH - hiddenWidth)
      if (!column || !column.width) return '0%'
      const colWidth = getColWidth(column)
      return colWidth
        ? `${colWidth * coefficient}%`
        : `0%`
    }

    const fullWidths = columnsWithWidth.reduce(
      (acc, column) => (getColWidth(column) ? acc + (getColWidth(column) as number) : 0),
      0
    );
    if (!column || !fullWidths) return DEFAULT;
    if (column.width) {
      const baseColWidth = getColWidth(column)
      if (!baseColWidth) return DEFAULT
      const width = (baseColWidth * FULL_WIDTH) / fullWidths;
      return `${width}%`;
    }
    let remainder = fullWidths;
    columnsWithWidth.forEach(col => {
      const colWidth = getColWidth(col);
      if (!colWidth) return;
      remainder = remainder - colWidth;
    });
    return `${remainder / (columns.length - (columnsWithWidth ? columnsWithWidth.length : 0))}%`;
  };
  return {sizeType, columnsWithWidth, computeWidth};
};