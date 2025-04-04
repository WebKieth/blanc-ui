import { FC, SyntheticEvent, useId } from "react"
import { InputProps } from "./types"
import cn from 'classnames'

import {
	inputFieldBoxStyle,
	inputFieldBoxVariants,
	inputFieldStyle,
	inputFieldVariants,
	inputLabelStyle,
	inputLabelVariants,
	inputStyle as _style,
	inputVariants as _variants,
	inputPlaceholderStyle,
	inputPlaceholderVariants
} from '@shared/components/input/styles.css'
import { useInputStateHandlers } from "../../hooks/useInputStateHandlers"

export const Input: FC<InputProps> = ({
	style = _style,
	variants = _variants,
	labelStyle = inputLabelStyle,
	labelVariants = inputLabelVariants,
	fieldBoxStyle = inputFieldBoxStyle,
	fieldBoxVariants = inputFieldBoxVariants,
	inputStyle = inputFieldStyle,
	inputVariants = inputFieldVariants,
	placeholderStyle = inputPlaceholderStyle,
	placeholderVariants = inputPlaceholderVariants,
	attributes = {},
	id = '',
	type = 'text',
	label = '',
	value = '',
	disabled = false,
	size = 'medium',
	invalid = false,
	onChange = () => {},
	onInput = () => {},
	children = null,
	renderLabel = null,
	renderPrefix = null,
	renderPostfix = null,
	renderPlaceholder = null
}) => {
	const inputId = id ? id : useId()

	const {
		hoverState: [hover],
		focusState: [focus],
		handleMouseIn,
		handleMouseOut,
		handleFocus,
		handleBlur
	} = useInputStateHandlers(disabled)

	return <div
		className={cn({
			[style]: style,
			[variants[size]]: variants[size] && size,
			[variants.disabled]: variants.disabled && disabled,
			[variants.invalid]: variants.invalid && invalid,
			[variants.hover]: variants.hover && hover,
			[variants.focus]: variants.focus && focus,
			[variants.filled]: variants.filled && value
		})}
		onMouseEnter={handleMouseIn}
		onMouseLeave={handleMouseOut}
	>
		{renderLabel
			? typeof renderLabel === 'function'
				? renderLabel()
				: renderLabel
			: label && (
					<label
						htmlFor={inputId}
						className={cn({
							[labelStyle]: labelStyle,
							[labelVariants[size]]: labelVariants[size] && size,
							[labelVariants.disabled]: labelVariants.disabled && disabled,
							[labelVariants.invalid]: labelVariants && invalid,
							[labelVariants.hover]: labelVariants.hover && hover,
							[labelVariants.focus]: labelVariants.focus && focus,
							[labelVariants.filled]: labelVariants.filled && value
						})}
					>
						{label}
					</label>
				)
		}
		{typeof children === 'function'
			? children({
					id: inputId,
					hover, focus,
					handleFocus, handleBlur,
					handleMouseIn, handleMouseOut
				})
			: children !== null
				? children
				: <div
					className={cn({
						[fieldBoxStyle]: fieldBoxStyle,
						[fieldBoxVariants[size]]: fieldBoxVariants[size] && size,
						[fieldBoxVariants.disabled]: fieldBoxVariants.disabled && disabled,
						[fieldBoxVariants.invalid]: fieldBoxVariants.invalid && invalid,
						[fieldBoxVariants.hover]: fieldBoxVariants.hover && hover,
						[fieldBoxVariants.focus]: fieldBoxVariants.focus && focus,
						[fieldBoxVariants.filled]: fieldBoxVariants.filled && value
					})}
				>
					{typeof renderPrefix === 'function'
						? renderPrefix()
						: renderPrefix
					}
					{renderPlaceholder && (
						<div className={cn({
							[placeholderStyle]: placeholderStyle,
							[placeholderVariants[size]]: placeholderVariants[size] && size,
							[placeholderVariants.disabled]: placeholderVariants.disabled && disabled,
							[placeholderVariants.invalid]: placeholderVariants.invalid,
							[placeholderVariants.hover]: placeholderVariants.hover && hover,
							[placeholderVariants.focus]: placeholderVariants.focus && focus,
							[placeholderVariants.filled]: placeholderVariants.filled && value
						})}>
							{typeof renderPlaceholder === 'function'
								? renderPlaceholder()
								: renderPlaceholder
							}
						</div>
					)}
					<input
						id={inputId}
						{...attributes}
						className={cn({
							[inputStyle]: inputStyle,
							[inputVariants[size]]: inputVariants[size] && size,
							[inputVariants.disabled]: inputVariants.disabled && disabled,
							[inputVariants.invalid]: inputVariants.invalid && invalid,
							[inputVariants.hover]: inputVariants.hover && hover,
							[inputVariants.focus]: inputVariants.focus && focus,
							[inputVariants.filled]: inputVariants.filled && value
						})}
						type={type}
						value={value}
						onFocus={handleFocus}
						onBlur={handleBlur}
						onChange={(e: SyntheticEvent) => onChange((e.target as HTMLInputElement).value)}
						onInput={(e: SyntheticEvent) => onInput((e.target as HTMLInputElement).value)}
					/>
					{typeof renderPostfix === 'function'
						? renderPostfix()
						: renderPostfix
					}
				</div>
		}
	</div>
}
