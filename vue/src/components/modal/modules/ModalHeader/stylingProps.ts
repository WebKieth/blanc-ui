import { ButtonSize, ButtonVariant } from "@shared/components/button"
import { definePropType } from "../../../../utils"
import {
  headerStyle as _headerStyle,
  headerTitleStyle as _headerTitleStyle,
  headerButtonStyle as _headerButtonStyle
} from './styles.css'

export const headerStyle = {
  type: String,
  default: _headerStyle
}
export const headerTitleStyle = {
  type: String,
  default: _headerTitleStyle
}
export const headerButtonStyle ={
  type: String,
  default: _headerButtonStyle
}
export const headerButtonIcon = {
  type: String,
  default: 'ri-close-line'
}
export const headerButtonSize = {
  type: definePropType<ButtonSize>(String),
  default: 'medium'
}
export const headerButtonVariant = {
  type: definePropType<ButtonVariant>(String),
  default: 'secondary'
}