import { IconProps } from "../../../../../shared/components/icon";
import { FC } from "react";

export const riAlertFill: FC<IconProps> = ({
  width,
  height,
  className = ''
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    id="ri-alert-fill"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <g>
      <path fill="none"
        d="M0 0h24v24H0z"
      ></path>
      <path
        d="M12.866 3l9.526 16.5a1 1 0 0 1-.866 1.5H2.474a1 1 0 0 1-.866-1.5L11.134 3a1 1 0 0 1 1.732 0zM11 16v2h2v-2h-2zm0-7v5h2V9h-2z"
      ></path>
    </g>
  </svg>
)