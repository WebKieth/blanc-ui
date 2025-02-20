import { FC } from "react"
import { IconProps } from "@shared/components/icon"
export type IconComponents = Record<string, FC<IconProps>>

export type IconifyProviderProps = {
  spriteUrl?: string
  components?: IconComponents
}

export type IconifyProvided = {
  components?: IconComponents
  sprite?: Document
}