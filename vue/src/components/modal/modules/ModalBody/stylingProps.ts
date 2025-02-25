import { IconSize } from "@shared/components/icon"
import { definePropType } from "../../../../utils"
import {
  bodyStyle as _bodyStyle,
  bodyIconStyle as _bodyIconStyle,
  bodyContentStyle as _bodyContentStyle
} from '@shared/components/modal/modules/body/styles.css'

export const bodyStyle = {
  type: String,
  default: _bodyStyle
}

export const bodyIconStyle = {
  type: String,
  default: _bodyIconStyle
}

export const bodyContentStyle = {
  type: String,
  default: _bodyContentStyle
}

export const bodyIcon = {
  type: String,
  default: 'ri-information-line'
}

export const bodyIconSize = {
  type: definePropType<IconSize>(String),
  default: 'medium'
}