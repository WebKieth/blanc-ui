import type { PropType } from 'vue'

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const definePropType = <T>(val: any): PropType<T> => val
