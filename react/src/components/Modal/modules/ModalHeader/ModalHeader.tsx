import { FC } from "react";
import { ModalHeaderProps } from "./types";
import cn from 'classnames'
import {
  headerStyle,
  headerTitleStyle,
  headerButtonStyle
} from '@shared/components/modal/modules/header/styles.css'
import { Button } from "../../../Button";
import { Icon } from "../../../Icon";

export {
  headerStyle as modalHeaderStyle,
  headerTitleStyle as modalHeaderTitleStyle,
  headerButtonStyle as modalHeaderButtonStyle
}

export const ModalHeader: FC<ModalHeaderProps> = ({
  title = '',
  renderTitle,
  renderButton,
  style = headerStyle,
  titleStyle = headerTitleStyle,
  buttonStyle = headerButtonStyle,
  buttonIcon = 'ri-close-line',
  buttonSize = 'medium',
  buttonVariant = 'secondary',
  onClose = () => {},
}) => (
  <div className={cn({[style]: style})}>
    {renderTitle
      ? renderTitle()
      : <div className={cn({[titleStyle]: titleStyle})}>
          {title}
        </div>
    }
    {renderButton
      ? renderButton()
      : <Button
          className={cn({[buttonStyle]: buttonStyle})}
          size={buttonSize}
          variant={buttonVariant}
          onClick={onClose}
        >
          <Icon name={buttonIcon} size={buttonSize} />
        </Button>
    }
  </div>
)