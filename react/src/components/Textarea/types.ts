import { HTMLAttributes, ReactNode } from "react"
import { StyleVariants } from "../../types"
import { TextareaSize } from "@shared/components/textarea"
import { Nullable } from "@shared/types"

type TextareaStylingProps = {
  style?: string
  variants?: StyleVariants
  labelStyle?: string
  labelVariants?: StyleVariants
  fieldBoxStyle?: string
  fieldBoxVariants?: StyleVariants
  textareaStyle?: string
  textareaVariants?: StyleVariants
  placeholderStyle?: string
  placeholderVariants?: StyleVariants
}

export type TextareaChildScope = {
  id: string
  hover: boolean
  focus: boolean
  handleFocus: () => void
  handleBlur: () => void
  handleMouseIn: () => void
  handleMouseOut: () => void
}

export type TextareaProps = {
  id?: string
  label?: string
  value?: string
  attributes?: HTMLAttributes<HTMLTextAreaElement>
  disabled? :boolean
  size?: TextareaSize
  invalid?: boolean
  placeholder?: string
  onChange?: (value: string) => void
  onInput?: (value: string) => void
  children?: Nullable<ReactNode | ((scope: TextareaChildScope) => ReactNode)>
  renderLabel?: Nullable<ReactNode | (() => ReactNode)>
  renderPlaceholder?: Nullable<ReactNode | (() => ReactNode)>
} & TextareaStylingProps