import { createContext, FC } from "react";
import cn from "classnames"
import { type ButtonGroupProps, type ProvidedButtonGroupProps } from "./types";
import { buttonGroupStyle } from "@shared/components/buttonGroup";

export const ButtonGroupContext = createContext<ProvidedButtonGroupProps | undefined>(undefined)

export const ButtonGroup: FC<ButtonGroupProps> = ({
  ref,
  style = buttonGroupStyle,
  value,
  onChange,
  children
}) => {
  return <ButtonGroupContext.Provider
    value={{value, onChange}}
  >
    <div className={cn({[style]: style})} ref={ref}>
      {children}
    </div>
  </ButtonGroupContext.Provider>
}