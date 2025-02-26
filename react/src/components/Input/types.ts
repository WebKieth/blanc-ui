import { InputHTMLAttributes, ReactNode } from "react"
import { StyleVariants } from "../types"
import {
  InputEmitter,
  InputId,
  InputSize,
  InputType,
  InputValue
} from "../../../../shared/components/input"
import { Nullable } from "../../../../shared/types"

export type InputStyleProps = {
  style?: string
  variants?: StyleVariants
  labelStyle?: string
  labelVariants?: StyleVariants
  fieldBoxStyle?: string
  fieldBoxVariants?: StyleVariants
  inputStyle?: string
  inputVariants?: StyleVariants
  placeholderStyle?: string
  placeholderVariants?: StyleVariants
}

export type InputChildScope = {
  hover: boolean
  focus: boolean
  handleFocus: () => void
  handleBlur: () => void
}

export type InputProps = {
  attributes?: InputHTMLAttributes<HTMLInputElement>
  id?: InputId
  type?: InputType
  label?: string
  disabled?: boolean
  size?: InputSize
  value?: InputValue
  onChange?: InputEmitter
  onInput?: InputEmitter
  children?: Nullable<ReactNode | ((scope: InputChildScope) => ReactNode)>
  renderPrefix?: Nullable<ReactNode | (() => ReactNode)>
  renderPostfix?: Nullable<ReactNode | (() => ReactNode)>
  renderPlaceholder?: Nullable<ReactNode | (() => ReactNode)>
} & InputStyleProps