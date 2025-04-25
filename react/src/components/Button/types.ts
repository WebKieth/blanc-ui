import { StyleVariants } from "../../types"
import { ButtonHTMLAttributes, ReactNode, Ref, SyntheticEvent } from "react"

export type ButtonStyleProps = {
	style?: string,
	variants?: StyleVariants
}

export type ButtonProps = {
	ref?: Ref<HTMLButtonElement>
	className?: string
	groupKey?: string | number
	active?: boolean
	disabled?: boolean
	attributes?: ButtonHTMLAttributes<HTMLButtonElement>
	children?: ReactNode
	onClick?: (e: SyntheticEvent) => void
} & ButtonStyleProps