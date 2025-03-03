import { FC, SyntheticEvent, useContext, useEffect, useMemo, useRef, useState } from "react"
import cn from 'classnames'
import { ButtonProps } from "./types"
import {
  buttonStyle,
  buttonVariants
} from "../../../../shared/components/button"
import { ButtonGroupContext } from "../ButtonGroup/ButtonGroup"


export const Button: FC<ButtonProps> = ({
	ref = null,
	className = '',
	style = buttonStyle,
	variants = buttonVariants,
	groupKey,
	variant = 'primary',
	active = false,
	rounded = false,
	danger = false,
	size = 'medium',
	disabled = false,
	attributes = {},
	children = null,
	onClick = () => false
}) => {
	const groupProps = useContext(ButtonGroupContext)
	const $el = useRef<HTMLButtonElement | null>(null)

	const [mounted, setMounted] = useState(false)

	const isInGroup = useMemo(
		() => groupProps !== undefined,
		[groupProps]
	)
	const isActive = useMemo(
		() => (
			active || (isInGroup && groupProps?.value && groupProps?.value === groupKey)
		),
		[groupProps, active, isInGroup, groupKey]
	)
	const handleClick = (e: SyntheticEvent) => {
		if (disabled) return
		if (groupProps?.onChange && groupKey && !isActive) {
			groupProps.onChange(groupKey)
		}
		onClick(e)
	}
	const isLast = useMemo(
		() => isInGroup && !$el.current?.nextElementSibling,
		[isInGroup, mounted]
	)
	const isMiddle = useMemo(
		() => isInGroup && Boolean($el.current?.previousElementSibling && $el.current?.nextElementSibling),
		[isInGroup, mounted]
	)
	const isFirst = useMemo(
		() => isInGroup && !$el.current?.previousElementSibling,
		[isInGroup, mounted]
	)
	useEffect(() => {
		setMounted(true)
	}, [])
	return <button
		{...attributes}
		ref={(element) => {
			$el.current = element
			if (typeof ref === 'function') {
				ref(element)
			} else if (ref) ref.current = element
		}}
		className={cn(
			className,
			style,
			{
				[cn({
					[variants.rounded]: variants.rounded
				})]: rounded
			},
			{
				[cn({
					[variants.danger]: variants.danger
				})]: danger
			},
			{
				[cn({
					[variants[variant]]: variants[variant]
				})]: !disabled
			},
			{
				[cn({
					[variants[size]]: variants[size]
				})]: size
			},
			{
				[cn({
					[variants.disabled]: variants.disabled
				})]: disabled
			},
			{
				[cn({
					[variants.disabled]: variants.disabled,
					[variants[`${variant}_disabled`]]: variants[`${variant}_disabled`]
				})]: disabled
			},
			{
				[cn({
					[variants.inGroup]: variants.inGroup
				})]: isInGroup
			},
			{
				[cn({
					[variants.active]: variants.active,
					[variants[`${variant}_active`]]: variants[`${variant}_active`]
				})]: isActive
			},
			{
				[cn({
					[variants.first]: variants.first,
					[variants[`${variant}_first`]]: variants[`${variant}_first`]
				})]: isFirst
			},
			{
				[cn({
					[variants.middle]: variants.middle,
					[variants[`${variant}_middle`]]: variants[`${variant}_middle`]
				})]: isMiddle
			},
			{
				[cn({
					[variants.last]: variants.last,
					[variants[`${variant}_last`]]: variants[`${variant}_last`]
				})]: isLast
			}
		)}
		disabled={disabled}
		onClick={handleClick}
	>
		{children}
	</button>
}
