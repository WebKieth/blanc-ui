import { ButtonSize, ButtonVariant } from "@shared/components/button"
import { ReactNode } from "react"

type ModalHeaderStylingProps = {
  style?: string
  titleStyle?: string
  buttonStyle?: string
  buttonIcon?: string
  buttonSize?: ButtonSize
  buttonVariant?: ButtonVariant
}

export type ModalHeaderProps = {
  title?: string
  onClose?: () => void
  renderTitle?: () => ReactNode
  renderButton?: () => ReactNode
} & ModalHeaderStylingProps