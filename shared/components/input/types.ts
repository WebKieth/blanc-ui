export type InputId = string
export type InputType = 'text' | 'number' | 'date'
export type InputValue = string | number | undefined
export type InputSize = 'medium' | 'small' | 'large'
export type InputEmitter = (value: string) => void

export type InputEmitters = {
  change: InputEmitter
  input: InputEmitter
}