import { useState } from "react"
import { ReactState } from "../types"

export type InputStateHandlersHook = (disabled?: boolean) => {
  hoverState: ReactState<boolean>
  focusState: ReactState<boolean>
  handleMouseIn: () => void
  handleMouseOut: () => void
  handleFocus: () => void
  handleBlur: () => void
}

export const useInputStateHandlers: InputStateHandlersHook = (disabled = false) => {
  const hoverState = useState(false)
  const focusState = useState(false)
  const setHover = hoverState[1]
  const setFocus = focusState[1]
  const handleMouseIn = () => {
    if (disabled) return
    setHover(true)
  }
  const handleMouseOut = () => {
    setHover(false)
  }
  const handleFocus = () => {
    if (disabled) return
    setFocus(true)
  }
  const handleBlur = () => {
    setFocus(false)
  }
  return {
    hoverState,
    focusState,
    handleMouseIn,
    handleMouseOut,
    handleFocus,
    handleBlur
  }
}