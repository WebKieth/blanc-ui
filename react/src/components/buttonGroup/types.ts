import { ReactNode, Ref } from "react"

export type ProvidedButtonGroupProps = {
  value?: string | number | symbol
  onChange?: (newValue: string | number) => void
}

export type ButtonGroupProps = {
  ref?: Ref<HTMLDivElement>
  style?: string
  children: ReactNode
} & ProvidedButtonGroupProps