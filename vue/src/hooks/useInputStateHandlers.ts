import { ComputedRef, Ref, ref } from "vue"

export type InputStateHandlersHook = (
  disabled: ComputedRef<boolean>
) => {
  hover: Ref<boolean>
  focus: Ref<boolean>
  handleMouseIn: () => void
  handleMouseOut: () => void
  handleFocus: () => void
  handleBlur: () => void
}

export const useInputStateHandlers: InputStateHandlersHook = (disabled) => {
  const hover = ref(false)
  const focus = ref(false)

  const handleMouseIn = () => {
    if (disabled.value) return
    hover.value = true
  }
  const handleMouseOut = () => hover.value = false

  const handleFocus = () => {
    if (disabled.value) return
    focus.value = true
  }
  const handleBlur = () => focus.value = false

  return {
    hover,
    focus,
    handleMouseIn,
    handleMouseOut,
    handleFocus,
    handleBlur
  }
}