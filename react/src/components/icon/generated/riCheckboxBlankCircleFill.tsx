import { IconProps } from "@shared/components/icon";
import { FC } from "react";

export const riCheckboxBlankCircleFill: FC<IconProps> = ({
  width,
  height,
  className = ''
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    id="ri-checkbox-blank-circle-fill"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <g>
      <path fill="none"
        d="M0 0h24v24H0z"
      ></path>
      <circle cx="12" cy="12" r="10"></circle>
    </g>
  </svg>
)