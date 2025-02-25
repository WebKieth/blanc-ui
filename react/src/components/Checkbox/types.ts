import { CheckboxSizes } from "@shared/components/checkbox/types"
import { StyleVariants } from "../types"
import { ReactNode, Ref } from "react"

export type CheckboxProps = {
  ref?: Ref<HTMLDivElement>
  inputRef?: Ref<HTMLInputElement>
  id?: string
  label?: string
  labelNode?: ReactNode
  caption?: string
  value: boolean
  size?: CheckboxSizes
  disabled?: boolean
  onChange: (value: boolean) => void
  style?: string
  fieldStyle?: string
  fieldVariants?: StyleVariants
  inputAreaStyle?: string
  iconStyle?: string
  iconVariants?: StyleVariants
  textContainerStyle?: string
  labelStyle?: string
  labelVariants?: StyleVariants
  captionStyle?: string
  captionVariants?: StyleVariants
  checkedIconName?: string
  uncheckedIconName?: string
}
