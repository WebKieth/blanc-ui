import { createContext, FC, PropsWithChildren, useContext } from "react";
import { AccordionProps } from "./types";
import cn from 'classnames'
import { accordionStyle } from "@shared/components/accordion";

const AccordionContext = createContext<AccordionProps | undefined>(undefined)

export const useAccordionProvided = () => useContext(AccordionContext)

export const Accordion: FC<PropsWithChildren<AccordionProps>> = ({
  style = accordionStyle,
  opened = '',
  onToggle = () => {},
  children
}) => (
  <AccordionContext.Provider value={{ opened, onToggle }}>
    <div className={cn({[style]: style})}>
      {children}
    </div>
  </AccordionContext.Provider>
)