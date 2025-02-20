import { type IconSize, type IconProps as SvgComponentProps } from "@shared/components/icon"
import { FC, useMemo } from "react"
import { IconProps } from "./types"
import { useIconify } from "../../providers/iconify"

export const Icon: FC<IconProps> = ({
  name,
  size = 'medium',
  className = ''
}) => {
  const sizes: Record<IconSize, SvgComponentProps> = {
    small: {
      width: 16,
      height: 16,
    },
    medium: {
      width: 20,
      height: 20,
    },
    large: {
      width: 24,
      height: 24,
    },
  }
  const { components, sprite } = useIconify()
  const currentSize = sizes[size]
  const spriteIcon = useMemo(() => (
    sprite?.querySelector(`#${name}`) || null
  ), [sprite, name])
  const spriteIconViewbox = useMemo(() => (
    spriteIcon?.getAttribute('viewBox')
  ), [spriteIcon])
  const IconComponent = components && components[name]

  return IconComponent ?
    <IconComponent
      className={className}
      {...currentSize}
    />
    : <svg
      viewBox={spriteIconViewbox || '0 0 24 24'}
      {...currentSize}
      dangerouslySetInnerHTML={{__html: spriteIcon?.innerHTML || ''}}
    ></svg>
}