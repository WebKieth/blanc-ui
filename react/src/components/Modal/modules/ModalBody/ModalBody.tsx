import { FC } from "react";
import { ModalBodyProps } from "./types";
import cn from 'classnames'
import {
  bodyStyle,
  bodyContentStyle,
  bodyIconStyle
} from '@shared/components/modal/modules/body/styles.css'
import { Icon } from "../../../Icon";

export {
  bodyStyle as modalBodyStyle,
  bodyContentStyle as modalBodyContentStyle,
  bodyIconStyle as modalBodyIconStyle
}

export const ModalBody: FC<ModalBodyProps> = ({
  style = bodyStyle,
  iconStyle = bodyIconStyle,
  contentStyle = bodyContentStyle,
  icon = 'ri-information-line',
  iconSize = 'medium',
  children,
  content = ''
}) => (
  <div className={cn({[style]: style})}>
    <div className={cn({[iconStyle]: iconStyle})}>
      <Icon name={icon} size={iconSize} />
    </div>
    <div className={cn({[contentStyle]: contentStyle})}>
      {children ? children : content}
    </div>
  </div>
)