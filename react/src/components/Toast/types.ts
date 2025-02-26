import { ReactNode } from "react"
import { StyleVariants } from "../types"
import { ToastSize } from "@shared/components/toast/types"

type ToastStylingProps = {
  style?: string
  variants?: StyleVariants
  boxStyle?: string
  boxVariants?: StyleVariants
  contentStyle?: string
  iconStyle?: string
  iconVariants?: StyleVariants
  contentVariants?: StyleVariants
  headerStyle?: string
  headerVariants?: StyleVariants
  titleStyle?: string
  titleVariants?: StyleVariants
  closeStyle?: string
  closeVariants?: StyleVariants
  messageStyle?: string
  messageVariants?: StyleVariants
}

export type ToastProps = {
  size?: ToastSize
  iconName?: string
  closeIconName?: string
  title?: string
  message?: string
  children?: ReactNode
  renderIcon?: () => ReactNode
  renderTitle?: () => ReactNode
  renderClose?: () => ReactNode
  renderMessage?: () => ReactNode
  onClose?: () => {}
} & ToastStylingProps