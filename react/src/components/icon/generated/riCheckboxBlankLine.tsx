import { IconProps } from "../../../../../shared/components/icon";
import { FC } from "react";

export const riCheckboxBlankLine: FC<IconProps> = ({
  width,
  height,
  className = ''
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    id="ri-checkbox-blank-line"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <g>
      <path fill="none"
        d="M0 0h24v24H0z"
      ></path>
      <path
        d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5z"
      ></path>
    </g>
  </svg>
)