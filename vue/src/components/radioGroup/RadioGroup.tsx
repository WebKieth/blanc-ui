import { definePropType } from "src/utils";
import { radioGroupStyle } from "./styles.css";
import { ExtractPublicPropTypes } from "vue";

export const radioGroupProps = {
  style: {
    type: String,
    default: radioGroupStyle
  },
  value: {
    type: definePropType<string | number | null>(null),
    default: null
  }
}

export type RadioGroupProps = ExtractPublicPropTypes<typeof radioGroupProps>