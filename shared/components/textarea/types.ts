export type TextareaValue = string | undefined
export type TextareaSize = 'medium' | 'small' | 'large'
export type TextareaEmitter = (value: string) => void

export type TextareaEmitters = {
  change: TextareaEmitter
  input: TextareaEmitter
}