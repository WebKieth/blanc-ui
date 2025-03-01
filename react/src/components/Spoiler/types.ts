import { SpoilerSize } from "@shared/components/spoiler"
import { StyleVariants } from "../types"
import { HTMLAttributes, ReactNode, Ref } from "react"

type SpoilerStylingProps = {
  style?: string
  variants?: StyleVariants
  headerStyle?: string
  headerVariants?: StyleVariants
  titleStyle?: string
  titleVariants?: StyleVariants
  contentStyle?: string
  contentVariants?: StyleVariants
  openedIcon?: string
  closedIcon?: string
}

type SpoilerToggleHandler = (value: boolean) => void

type SpoilerRendererAttributes = {
  toggle: SpoilerToggleHandler
}

export type SpoilerProps = {
  ref?: Ref<HTMLDivElement>
  title?: string
  groupKey?: string | symbol
  opened?: boolean
  disabled?: boolean
  size?: SpoilerSize
  attributes?: HTMLAttributes<HTMLDivElement>
  onToggle?: SpoilerToggleHandler,
  children?: ReactNode,
  renderTitle?: ((attrs: SpoilerRendererAttributes) => ReactNode | ReactNode)
  renderExpander?: ((attrs: SpoilerRendererAttributes) => ReactNode | ReactNode)
} & SpoilerStylingProps