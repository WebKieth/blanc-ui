import { _NotifyOptions, NotifyPosition } from "@shared/plugins/notify/types";
import { FC } from "react";

export type NotifyOptions = _NotifyOptions<{
  component: FC,
  props: unknown
} | null>

export type ToastOptions = {
  position: NotifyPosition
  Component: FC
  props?: unknown
  autoHide: boolean
}

export type Toasts = Record<string, ToastOptions>

export type NotifyProvided = {
  push: (options: NotifyOptions) => string
  remove: (id: string) => void
}

export type ToastTimeouts = Record<string, ReturnType<typeof setTimeout>>