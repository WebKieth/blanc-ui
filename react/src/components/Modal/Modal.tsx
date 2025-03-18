import { FC } from "react";
import cn from 'classnames'
import { ModalProps } from "./types";
import {
  modalBackdropStyle,
  modalWindowStyle
} from "@shared/components/modal/styles.css";
import {
  bodyIconStyle as _bodyIconStyle,
  bodyContentStyle as _bodyContentStyle,
  bodyStyle as _bodyStyle
} from "@shared/components/modal/modules/body/styles.css";
import {
  headerStyle as _headerStyle,
  headerTitleStyle as _headerTitleStyle,
  headerButtonStyle as _headerButtonStyle
} from "@shared/components/modal/modules/header/styles.css";
import { ModalBody } from "./modules/ModalBody";
import { ModalHeader } from "./modules/ModalHeader/ModalHeader";

export const Modal: FC<ModalProps> = ({
  title = '',
  content = '',
  isCloseByBackdropClick = true,
  zIndex = 1,
  attributes = {},
  backdropStyle = modalBackdropStyle,
  windowStyle = modalWindowStyle,
  onClose = () => {},
  children,
  renderHeader,
  renderBody,
  renderContent,
  /** modal body props pass */
  bodyIcon = 'ri-information-line',
  bodyIconSize = 'medium',
  bodyStyle = _bodyStyle,
  bodyIconStyle = _bodyIconStyle,
  bodyContentStyle = _bodyContentStyle,
  /** modal header props pass */
  headerStyle = _headerStyle,
  headerTitleStyle = _headerTitleStyle,
  headerButtonStyle = _headerButtonStyle,
  headerButtonIcon = 'ri-close-line',
  headerButtonSize = 'medium',
  headerButtonVariant = 'info',
  renderHeaderTitle,
  renderHeaderButton
}) => (
  <>
    <div
      className={cn({[backdropStyle]: backdropStyle})}
      style={{ zIndex }}
      onClick={isCloseByBackdropClick ? () => onClose() : undefined}
    ></div>
    <div
      {...attributes}
      className={cn({[windowStyle]: windowStyle})}
      style={{ zIndex }}
    >
      {children
        ? children
        : <>
            {renderHeader
              ? renderHeader()
              : <ModalHeader
                  title={title}
                  buttonIcon={headerButtonIcon}
                  buttonSize={headerButtonSize}
                  buttonVariant={headerButtonVariant}
                  style={headerStyle}
                  titleStyle={headerTitleStyle}
                  buttonStyle={headerButtonStyle}
                  renderTitle={renderHeaderTitle}
                  renderButton={renderHeaderButton}
                  onClose={onClose}
                />
            }
            {renderBody
              ? renderBody()
              : <ModalBody
                  content={content}
                  icon={bodyIcon}
                  iconSize={bodyIconSize}
                  style={bodyStyle}
                  iconStyle={bodyIconStyle}
                  contentStyle={bodyContentStyle}
                  children={renderContent ? renderContent() : null}
                />
            }
          </>
      }
    </div>
  </>
)