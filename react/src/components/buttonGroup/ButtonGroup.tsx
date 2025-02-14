import { createContext, FC } from "react";
import { type ButtonGroupProps, type ProvidedButtonGroupProps } from "./types";
import { buttonGroupStyle } from "../../../../shared/components/buttonGroup";

export const ButtonGroupContext = createContext<ProvidedButtonGroupProps | undefined>(undefined)

export const ButtonGroup: FC<ButtonGroupProps> = ({
  style = buttonGroupStyle,
  value = null,
  onChange = null,
  children
}) => {
  return <ButtonGroupContext.Provider
    value={{value, onChange}}
  >
    <div className={style}>
      {children}
    </div>
  </ButtonGroupContext.Provider>
}