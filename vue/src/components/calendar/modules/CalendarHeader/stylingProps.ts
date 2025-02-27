import {
  headerStyle as _headerStyle,
  controlsStyle,
  titlesStyle,
  monthTitleStyle,
  rewinderStyle,
  yearTitleStyle
} from "./styles.css";

export const headerStyle = {
  type: String,
  default: _headerStyle
}

export const headerControlsStyle = {
  type: String,
  default: controlsStyle
}

export const headerTitlesStyle = {
  type: String,
  default: titlesStyle
}

export const headerMonthTitleStyle = {
  type: String,
  default: monthTitleStyle
}

export const headerYearTitleStyle = {
  type: String,
  default: yearTitleStyle
}

export const headerRewinderStyle = {
  type: String,
  default: rewinderStyle
}

export const prevYearIcon = {
  type: String,
  default: 'ri-arrow-left-double-line'
}
export const prevMonthIcon = {
  type: String,
  default: 'ri-arrow-left-s-line'
}
export const nextMonthIcon = {
  type: String,
  default: 'ri-arrow-right-s-line'
}
export const nextYearIcon = {
  type: String,
  default: 'ri-arrow-right-double-line'
}