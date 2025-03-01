type AccordionStylingProps = {
  style?: string
}

export type AccordionProps = {
  opened?: string | symbol
  onToggle?: (groupKey?: string | symbol) => void
} & AccordionStylingProps
