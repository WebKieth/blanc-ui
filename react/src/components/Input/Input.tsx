import { FC, SyntheticEvent, useId, useState } from "react"
import { InputProps } from "./types"

import {
	inputFieldBoxStyle,
	inputFieldBoxVariants,
	inputFieldStyle,
	inputFieldVariants,
	inputLabelStyle,
	inputLabelVariants,
	inputStyle,
	inputVariants
} from './index'

export const Input: FC<InputProps> = ({
	style = inputStyle,
	variants = inputVariants,
	labelStyle = inputLabelStyle,
	labelVariants = inputLabelVariants,
	fieldBoxStyle = inputFieldBoxStyle,
	fieldBoxVariants = inputFieldBoxVariants,
	fieldStyle = inputFieldStyle,
	fieldVariants = inputFieldVariants,
	attributes = {},
	id = '',
	type = 'text',
	label = '',
	value = '',
	disabled = false,
	size = 'medium',
	onChange = () => {},
	onInput = () => {},
	children = null,
	prefix = null,
	postfix = null
}) => {
	const inputId = id ? id : useId()

	const [hover, setHover] = useState(false)
	const [focus, setFocus] = useState(false)

	const handleMouseIn = () => {
		if (disabled) return
		setHover(true)
	}
	const handleMouseOut = () => setHover(false)

	const handleFocus = () => {
		if (disabled) return
		setFocus(true)
	}
	const handleBlur = () => setFocus(false)

	return <div
		{...attributes}
		className={`
			${style}
			${variants[size]}
			${disabled && variants.disabled}
			${hover && variants.hover}
			${focus && variants.focus}
		`}
		onMouseEnter={handleMouseIn}
		onMouseLeave={handleMouseOut}
	>
		{label && (
			<label
				htmlFor={inputId}
				className={`
					${labelStyle}
					${labelVariants[size]}
					${disabled && labelVariants.disabled}
					${hover && labelVariants.hover}
					${(focus || value) && labelVariants.focus}
				`}
			>
				{label}
			</label>
		)}
		{typeof children === 'function'
			? children({ hover, focus, handleFocus, handleBlur })
			: children !== null
				? children
				: <div
					className={`
						${fieldBoxStyle}
						${fieldBoxVariants[size]}
						${disabled && fieldBoxVariants.disabled}
						${hover && fieldBoxVariants.hover}
						${focus && fieldBoxVariants.focus}
					`}
				>
					{typeof prefix === 'function'
						? prefix()
						: prefix
					}
					<input
						id={inputId}
						className={`
							${fieldStyle}
							${fieldVariants[size]}
							${disabled && fieldVariants.disabled}
							${hover && fieldVariants.hover}
							${focus && fieldVariants.focus}
						`}
						type={type}
						value={value}
						onFocus={handleFocus}
						onBlur={handleBlur}
						onChange={(e: SyntheticEvent) => onChange((e.target as HTMLInputElement).value)}
						onInput={(e: SyntheticEvent) => onInput((e.target as HTMLInputElement).value)}
					/>
					{typeof postfix === 'function'
						? postfix()
						: postfix
					}
				</div>
		}
	</div>
}
