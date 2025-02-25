import { FC } from "react"

export type ViewLayersProvided = {
  open: (component: FC, props?: unknown) => void
  close: (componentName: string) => void
}
export type ViewLayer = {
  Component: FC
  props?: unknown
}
export type ViewLayers = Record<string, ViewLayer>