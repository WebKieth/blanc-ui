import {
  gridStyle as _gridStyle,
  cellStyle,
  cellVariants,
  rowStyle,
  weekdayCellStyle,

} from './styles.css'

export const gridStyle = {
  type: String,
  default: _gridStyle
}

export const gridRowStyle = {
  type: String,
  default: rowStyle
}

export const gridWeekdayCellStyle = {
  type: String,
  default: weekdayCellStyle
}

export const gridCellStyle = {
  type: String,
  default: cellStyle
}

export const gridCellVariants = {
  type: Object,
  default: cellVariants
}