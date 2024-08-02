import { ButtonHTMLAttributes, ReactNode, SyntheticEvent } from "react"

import {
	buttonStyle,
	buttonVariants,
	type ButtonVariant,
	type ButtonSize
} from "@shared/components/button"

export type ButtonProps = {
	style?: string,
	variants?: Record<string, string>
	variant?: ButtonVariant
	size?: ButtonSize
	disabled?: boolean
	attributes?: ButtonHTMLAttributes<HTMLButtonElement>
	children?: ReactNode
	onClick?: (e: SyntheticEvent) => void
}

export const Button = ({
	style = buttonStyle,
	variants = buttonVariants,
	variant = 'primary',
	size = 'medium',
	disabled = false,
	attributes = {},
	children = null,
	onClick = () => false
}: ButtonProps) => {
	return <button
		{...attributes}
		className={`
			${style}
			${(variants && !disabled) && variants[variant]}
			${variants && variants[size]}
			${disabled && `${variants.disabled} ${variants[`disabled_${variant}`]}`}
		`}
		disabled={disabled}
		onClick={(e: SyntheticEvent) => !disabled && onClick(e)}
	>
		{children}
	</button>
}

export { buttonStyle, buttonVariants }