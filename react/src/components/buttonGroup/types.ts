import { ReactNode } from "react"
import { ButtonGroupChangeActiveHandler } from "../../../../shared/components/buttonGroup"

export type ProvidedButtonGroupProps = {
  value?: string | number | null
  onChange?: ButtonGroupChangeActiveHandler | null,
}

export type ButtonGroupProps = {
  style?: string
  children: ReactNode
} & ProvidedButtonGroupProps