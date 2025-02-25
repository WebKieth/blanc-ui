import { IconSize } from "@shared/components/icon"
import { ReactNode } from "react"

type ModalBodyStylingProps = {
  style?: string
  iconStyle?: string
  contentStyle?: string
  icon?: string
  iconSize?: IconSize
}

export type ModalBodyProps = {
  content?: string
  children?: ReactNode
} & ModalBodyStylingProps