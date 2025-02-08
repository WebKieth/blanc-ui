import { IconName, IconSize, IconProps as SvgComponentProps } from "@shared/components/icon"
import * as components from './components'
import { FC } from "react"
import { IconProps } from "./types"

export const Icon: FC<IconProps> = ({
  name,
  size = 'medium',
  className = ''
}) => {
  const sizes: Record<IconSize, SvgComponentProps> = {
    small: {
      width: 16,
      height: 16,
      stroke: 1.8, // (reproportion from viewbox: (24 / 16) * 1.2)
    },
    medium: {
      width: 20,
      height: 20,
      stroke: 1.68, // (reproportion from viewbox: (24 / 20) * 1.4)
    },
    large: {
      width: 24,
      height: 24,
      stroke: 1.6,
    },
  }
  const currentProps = sizes[size]
  const camelize = (s: IconName) => s.replace(/-./g, (x) => x[1].toUpperCase()) as keyof typeof components
  const IconComponent = components[camelize(name)]
  return <IconComponent
    className={className}
    {...currentProps}
  />
}