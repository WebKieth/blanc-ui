import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SpoilerProps } from "./types";
import cn from 'classnames'
import {
  spoilerContentStyle,
  spoilerContentVariants,
  spoilerHeaderStyle,
  spoilerHeaderVariants,
  spoilerStyle,
  spoilerTitleStyle,
  spoilerTitleVariants,
  spoilerVariants
} from "@shared/components/spoiler";
import { Icon } from "../Icon";
import { Button } from "../Button";
import { useAccordionProvided } from "../Accordion";

export const Spoiler: FC<SpoilerProps> = ({
  ref = null,
  style = spoilerStyle,
  variants = spoilerVariants,
  headerStyle = spoilerHeaderStyle,
  headerVariants = spoilerHeaderVariants,
  titleStyle = spoilerTitleStyle,
  titleVariants = spoilerTitleVariants,
  contentStyle = spoilerContentStyle,
  contentVariants = spoilerContentVariants,
  openedIcon = 'ri-arrow-up-s-line',
  closedIcon = 'ri-arrow-down-s-line',
  title = '',
  groupKey = '',
  opened = false,
  disabled = false,
  attributes = {},
  size = 'medium',
  onToggle = () => {},
  renderExpander,
  renderTitle,
  children,
}) => {
  const $el = useRef<HTMLDivElement | null>(null)
  const accordion = useAccordionProvided()

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const isOpen = useMemo(() => (
    opened || groupKey === accordion?.opened
  ), [opened, groupKey, accordion])

  const isInGroup = useMemo(() => (
    Boolean(accordion)
  ), [accordion])

  const isLast = useMemo(() => (
    isInGroup && !$el.current?.nextElementSibling
  ), [mounted])

  const isMiddle = useMemo(() => (
    isInGroup && Boolean($el.current?.previousElementSibling && $el.current?.nextElementSibling)
  ), [mounted])

  const isFirst = useMemo(() => (
    isInGroup && !$el.current?.previousElementSibling
  ), [mounted])

  const handleToggle = useCallback(() => {
    if (accordion && accordion.onToggle) {
      accordion.onToggle(
        groupKey !== accordion.opened
          ? groupKey
          : undefined
      )
    }
    onToggle(!isOpen)
  }, [accordion])
  return (
    <div
      ref={(element) => {
        $el.current = element
        if (typeof ref === 'function') {
          ref(element)
        } else if (ref) ref.current = element
      }}
      {...attributes}
      className={cn({
        [style]: style,
        [variants[size]]: variants[size] && size,
        [variants.disabled]: variants.disabled && disabled,
        [variants.opened]: isOpen,
        [variants.last]: variants.last && isLast,
        [variants.middle]: variants.middle && isMiddle,
        [variants.first]: variants.first && isFirst
      })}
    >
      <div className={cn({
        [headerStyle]: headerStyle,
        [headerVariants[size]]: headerVariants[size] && size,
        [headerVariants.disabled]: headerVariants.disabled && disabled,
        [headerVariants.opened]: isOpen
      })}>
        {renderTitle
          ? typeof renderTitle === 'function'
            ? renderTitle({toggle: handleToggle})
            : renderTitle
          : <div className={cn({
              [titleStyle]: titleStyle,
              [titleVariants[size]]: titleVariants[size] && size,
              [titleVariants.disabled]: titleVariants.disabled && disabled,
              [titleVariants.opened]: isOpen
            })}>
              {title}
            </div>
        }
        {renderExpander
          ? typeof renderExpander === 'function'
            ? renderExpander({toggle: handleToggle})
            : renderExpander
          : <Button
              variant='info'
              size={size}
              onClick={() => handleToggle()}
            >
              <Icon
                name={isOpen ? openedIcon : closedIcon}
                size={size}
              />
            </Button>
        }
      </div>
      <div className={cn({
        [contentStyle]: contentStyle,
        [contentVariants[size]]: contentVariants[size] && size,
        [contentVariants.disabled]: contentVariants.disabled && disabled,
        [contentVariants.opened]: contentVariants.opened && isOpen
      })}>
        {children}
      </div>
    </div>
  )
}