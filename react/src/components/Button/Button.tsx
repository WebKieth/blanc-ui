import { FC, SyntheticEvent, useContext, useEffect, useMemo, useRef, useState } from "react"
import cn from 'classnames'
import { ButtonProps } from "./types"
import {
  buttonStyle,
  buttonVariants
} from "@shared/components/button"
import { ButtonGroupContext } from "../ButtonGroup/ButtonGroup"


export const Button: FC<ButtonProps> = ({
  ref = null,
  className = '',
  style = buttonStyle,
  variants = buttonVariants,
  groupKey,
  active = false,
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
          [variants.disabled]: variants.disabled
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
        })]: isActive
      },
      {
        [cn({
          [variants.first]: variants.first,
        })]: isFirst
      },
      {
        [cn({
          [variants.middle]: variants.middle,
        })]: isMiddle
      },
      {
        [cn({
          [variants.last]: variants.last,
        })]: isLast
      }
    )}
    disabled={disabled}
    onClick={handleClick}
  >
    {children}
  </button>
}
