import { HTMLAttributes, ReactNode } from "react"
import { IconSize } from "@shared/components/icon"
import { ButtonSize, ButtonVariant } from "@shared/components/button"

export type ModalStylingProps = {
  backdropStyle?: string
  windowStyle?: string
}

type _ModalBodyStylingProps = {
  bodyStyle?: string
  bodyIconStyle?: string
  bodyContentStyle?: string
  bodyIcon?: string
  bodyIconSize?: IconSize
}

type _ModalHeaderStylingProps = {
  headerStyle?: string
  headerTitleStyle?: string
  headerButtonStyle?: string
  headerButtonIcon?: string
  headerButtonSize?: ButtonSize
  headerButtonVariant?: ButtonVariant
}

type _ModalHeaderSlotProps = {
  renderHeaderTitle?: () => ReactNode
  renderHeaderButton?: () => ReactNode
}

type _ModalHeaderProps = {}
  & _ModalHeaderStylingProps
  & _ModalHeaderSlotProps

export type ModalProps = {
  title?: string
  content?: string
  isCloseByBackdropClick?: boolean
  zIndex?: number
  attributes?: HTMLAttributes<HTMLDivElement>
  onClose?: () => void
  children?: ReactNode
  renderHeader?: () => ReactNode
  renderBody?: () => ReactNode
  renderContent?: () => ReactNode
} & ModalStylingProps
  & _ModalBodyStylingProps
  & _ModalHeaderProps
