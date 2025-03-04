export type OptionId = string | symbol | number

export type Option = {
  id: OptionId
  value: string
} | string

export type SelectEmitters = {
  search: (value: string) => void
  change: (selected?: OptionId | OptionId[]) => void
}

export type SelectSize = 'small' | 'medium' | 'large'