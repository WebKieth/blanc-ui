import { SyntheticEvent } from "react"
import { ButtonProps } from "./types"
import {
	buttonStyle,
	buttonVariants,
} from "@shared/components/button"

export const Button = ({
	style = buttonStyle,
	variants = buttonVariants,
	variant = 'primary',
	size = 'medium',
	disabled = false,
	attributes = {},
	children = null,
	onClick = () => false
}: ButtonProps) => (
	<button
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
)

export {
	buttonStyle,
	buttonVariants,
	type ButtonProps
}