import { IconProps } from "../../../../../shared/components/icon";
import { FC } from "react";

export const riArrowLeftSLine: FC<IconProps> = ({
  width,
  height,
  className = ''
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    id="ri-arrow-left-s-line"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <g>
      <path fill="none"
        d="M0 0h24v24H0z"
      ></path>
      <path
        d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"
      ></path>
    </g>
  </svg>
)