import { buttonStyle, buttonVariants } from "@shared/components/button";
import { definePropType } from "../../utils";

export const buttonProps = {
  style: {
    type: String,
    default: buttonStyle
  },
  variants: {
    type: Object,
    default: buttonVariants
  },
  groupKey: {
    type: definePropType<string | number | symbol | null>(null),
    default: null
  },
  active: {
    type: definePropType<boolean>(Boolean),
    default: false
  },
  disabled: {
    type: definePropType<boolean>(Boolean),
    default: false
  }
}