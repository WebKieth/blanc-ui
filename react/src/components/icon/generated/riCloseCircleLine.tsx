import { IconProps } from "@shared/components/icon";
import { FC } from "react";

export const riCloseCircleLine: FC<IconProps> = ({
  width,
  height,
  className = ''
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    id="ri-close-circle-line"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <g>
      <path fill="none"
        d="M0 0h24v24H0z"
      ></path>
      <path
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"
      ></path>
    </g>
  </svg>
)