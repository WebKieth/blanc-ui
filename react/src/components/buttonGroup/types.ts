import { ReactNode } from "react"

export type ProvidedButtonGroupProps = {
  value?: string | number | symbol
  onChange?: (newValue: string | number) => void
}

export type ButtonGroupProps = {
  style?: string
  children: ReactNode
} & ProvidedButtonGroupProps