import { FC, KeyboardEventHandler, useRef } from "react";
import cn from 'classnames';
import { CheckboxProps } from "./types";
import { v4 as uuid } from 'uuid'
import {
  checkboxCaptionStyle,
  checkboxCaptionVariants,
  checkboxFieldStyle,
  checkboxFieldVariants,
  checkboxIconStyle,
  checkboxIconVariants,
  checkboxInputAreaStyle,
  checkboxLabelStyle,
  checkboxLabelVariants,
  checkboxStyle,
  checkboxTextContainerStyle
} from "@shared/components/checkbox";
import { Icon } from "../Icon";

export const Checkbox: FC<CheckboxProps> = ({
  style = checkboxStyle,
  fieldStyle = checkboxFieldStyle,
  fieldVariants = checkboxFieldVariants,
  inputAreaStyle = checkboxInputAreaStyle,
  iconStyle = checkboxIconStyle,
  iconVariants = checkboxIconVariants,
  textContainerStyle = checkboxTextContainerStyle,
  labelStyle = checkboxLabelStyle,
  labelVariants = checkboxLabelVariants,
  captionStyle = checkboxCaptionStyle,
  captionVariants = checkboxCaptionVariants,
  checkedIconName = 'ri-check-line',
  uncheckedIconName = 'ri-check-line',
  ref = null,
  inputRef = null,
  id = uuid(),
  label = '',
  labelNode = null,
  caption = '',
  value,
  size = 'medium',
  disabled = false,
  onChange
}) => {
  const $inputRef = useRef<HTMLInputElement | null>(null)
  const handleChange = () => {
    if (!$inputRef.current) return
    const checked = $inputRef.current.checked
    onChange(checked)
  }
  const onKeyDownHandler: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter') handleChange()
  }
  return (
    <div className={cn({[style]: style})} ref={ref}>
      <div
        tabIndex={0}
        className={cn(
          fieldStyle,
          fieldVariants[size],
          disabled && fieldVariants.disabled,
          value
            ? fieldVariants.checked
            : fieldVariants.unchecked
        )}
        onKeyDown={onKeyDownHandler}
      >
        <input
          ref={(element) => {
            $inputRef.current = element
            if (typeof inputRef === 'function') inputRef(element)
            else if (inputRef) inputRef.current = element
          }}
          type='checkbox'
          className={inputAreaStyle}
          id={id}
          value={`${value}`}
          disabled={disabled}
          onChange={handleChange}
          tabIndex={-1}
        />
        <Icon
          name={value ? checkedIconName : uncheckedIconName}
          className={cn(
            iconStyle,
            iconVariants[size],
            disabled && iconVariants.disabled,
            value
              ? iconVariants.checked
              : iconVariants.unchecked
          )}
        />
      </div>
      <div className={textContainerStyle}>
        {(label || caption)
          ? <>
            {label && (
              <label
                className={cn(
                  labelStyle,
                  labelVariants[size],
                  disabled && labelVariants.disabled,
                  value
                    ? labelVariants.checked
                    : labelVariants.unchecked
                )}
              >
                {label}
              </label>
            )}
            {caption && (
              <div
                className={cn(
                  captionStyle,
                  captionVariants[size],
                  disabled && captionVariants.disabled,
                  value
                    ? captionVariants.unchecked
                    : captionVariants.checked
                )}
              >
                {caption}
              </div>
            )}
          </>
          : labelNode
        }
      </div>
    </div>
  )
}


