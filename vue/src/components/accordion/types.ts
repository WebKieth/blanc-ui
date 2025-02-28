import { ComputedRef } from "vue"

export type AccordionProps = {
  style?: string
  opened?: string | symbol
}

export type AccordionEmitters = {
  toggle: (key?: string | symbol) => void
}

export type AccordionProvided = {
  openedKey: ComputedRef<string | symbol>
  emit: (event: "toggle", key?: string | symbol) => void
}