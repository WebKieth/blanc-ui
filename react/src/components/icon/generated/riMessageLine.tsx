import { IconProps } from "@shared/components/icon";
import { FC } from "react";

export const riMessageLine: FC<IconProps> = ({
  width,
  height,
  className = ''
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    id="ri-message-line"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <g>
      <path fill="none"
        d="M0 0h24v24H0z"
      ></path>
      <path
        d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zm-.692-2H20V5H4v13.385L5.763 17zM8 10h8v2H8v-2z"
      ></path>
    </g>
  </svg>
)