import { ButtonSize, ButtonVariant } from "../../../../shared/components/button"
import { StyleVariants } from "../types"
import { ButtonHTMLAttributes, ReactNode, SyntheticEvent } from "react"

export type ButtonStyleProps = {
	style?: string,
	variants?: StyleVariants
}

export type ButtonProps = {
	variant?: ButtonVariant
	groupKey?: string | number
	active?: boolean
	size?: ButtonSize
	disabled?: boolean
	attributes?: ButtonHTMLAttributes<HTMLButtonElement>
	children?: ReactNode
	onClick?: (e: SyntheticEvent) => void
} & ButtonStyleProps