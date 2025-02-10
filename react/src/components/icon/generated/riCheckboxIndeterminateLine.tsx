import { IconProps } from "../../../../../shared/components/icon";
import { FC } from "react";

export const riCheckboxIndeterminateLine: FC<IconProps> = ({
  width,
  height,
  className = ''
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    id="ri-checkbox-indeterminate-line"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <g>
      <path fill="none"
        d="M0 0h24v24H0z"
      ></path>
      <path
        d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm2 6h10v2H7v-2z"
      ></path>
    </g>
  </svg>
)