export type OptionId = string | symbol | number

export type Option = {
  id: OptionId
  caption: string
} | string

export type SelectEmitters = {
  search: (value: string) => void
  change: (selected?: OptionId | OptionId[]) => void
}

export type SelectOptionScope = {
  option: Option,
  selected: boolean
  handleSelect: (option: Option) => void
}
export type SelectOptionsScope = {
  options: Option[]
  isSelected: (option: Option) => void
  handleSelect: (option: Option) => void
}

export type SelectSize = 'small' | 'medium' | 'large'