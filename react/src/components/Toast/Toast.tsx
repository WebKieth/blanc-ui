import { FC } from "react";
import { ToastProps } from "./types";
import cn from 'classnames'
import {
  toastBoxStyle,
  toastBoxVariants,
  toastCloseStyle,
  toastCloseVariants,
  toastContentStyle,
  toastContentVariants,
  toastHeaderStyle,
  toastHeaderVariants,
  toastIconStyle,
  toastIconVariants,
  toastMessageStyle,
  toastMessageVariants,
  toastStyle,
  toastTitleStyle,
  toastTitleVariants,
  toastVariants
} from "@shared/components/toast/styles.css";
import { Icon } from "../Icon";

export {
  toastBoxStyle,
  toastBoxVariants,
  toastCloseStyle,
  toastCloseVariants,
  toastContentStyle,
  toastContentVariants,
  toastHeaderStyle,
  toastHeaderVariants,
  toastIconStyle,
  toastIconVariants,
  toastMessageStyle,
  toastMessageVariants,
  toastStyle,
  toastTitleStyle,
  toastTitleVariants,
  toastVariants
}

export const Toast: FC<ToastProps> = ({
  size = 'medium',
  children,
  message = '',
  title = '',
  iconName = 'ri-message-line',
  closeIconName = 'ri-close-line',
  style = toastStyle,
  variants = toastVariants,
  boxStyle = toastBoxStyle,
  boxVariants = toastBoxVariants,
  iconStyle = toastIconStyle,
  iconVariants = toastIconVariants,
  contentStyle = toastContentStyle,
  contentVariants = toastContentVariants,
  headerStyle = toastHeaderStyle,
  headerVariants = toastHeaderVariants,
  titleStyle = toastTitleStyle,
  titleVariants = toastTitleVariants,
  closeStyle = toastCloseStyle,
  closeVariants = toastCloseVariants,
  messageStyle = toastMessageStyle,
  messageVariants = toastMessageVariants,
  renderIcon,
  renderTitle,
  renderMessage,
  renderClose,
  onClose
}) => (
  <div className={cn({
    [style]: style,
    [variants[size]]: size && variants[size]
  })}>
    {children
      ? children
      : <div className={cn({
          [boxStyle]: boxStyle,
          [boxVariants[size]]: size && boxVariants[size]
        })}>
          <div className={cn({
            [iconStyle]: iconStyle,
            [iconVariants[size]]: size && iconVariants[size]
          })}>
            {renderIcon
              ? renderIcon()
              : <Icon name={iconName} size={size} />
            }
          </div>
          <div className={cn({
            [contentStyle]: contentStyle,
            [contentVariants[size]]: size && contentVariants[size]
          })}>
            <div className={cn({
              [headerStyle]: headerStyle,
              [headerVariants[size]]: size && headerVariants[size]
            })}>
              {renderTitle
                ? renderTitle()
                : <div className={cn({
                    [titleStyle]: titleStyle,
                    [titleVariants[size]]: size && titleVariants[size]
                  })}>
                    {title}
                  </div>
              }
              {renderClose
                ? renderClose()
                : <div
                    className={cn({
                      [closeStyle]: closeStyle,
                      [closeVariants[size]]: size && closeVariants[size]
                    })}
                    onClick={onClose}
                  >
                    <Icon name={closeIconName} size={size} />
                  </div>
              }
            </div>
            {renderMessage
              ? renderMessage()
              : <div className={cn({
                  [messageStyle]: messageStyle,
                  [messageVariants[size]]: size && messageVariants[size]
                })}>
                  {message}
                </div>
            }
          </div>
        </div>
    }
  </div>
)