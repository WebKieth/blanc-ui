import { IconProps } from "@shared/components/icon";
import { FC } from "react";

export const riCheckFill: FC<IconProps> = ({
  width,
  height,
  className = ''
}) => (
  <svg
    width={width}
    className={className}
    height={height}
    id="ri-check-fill"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <g>
      <path fill="none"
        d="M0 0h24v24H0z"
      ></path>
      <path
        d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
      ></path>
    </g>
  </svg>
)