export type InputType = 'text' | 'number'
export type InputValue = string | number | null
export type InputSize = 'medium' | 'small' | 'large'
export type InputEventName = 'change' | 'input' | 'keyup' | 'keypress' | 'keydown' | 'focus' | 'blur' | 'mousein' | 'mouseout'
export type Emitter = (value: string | number) => void
