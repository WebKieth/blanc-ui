import { FC, SyntheticEvent, useId } from "react";
import cn from 'classnames'
import { TextareaProps } from "./types";
import {
  textareaFieldBoxStyle,
  textareaFieldBoxVariants,
  textareaLabelStyle,
  textareaLabelVariants,
  textareaPlaceholderStyle,
  textareaPlaceholderVariants,
  textareaStyle as _textareaStyle,
  textareaVariants as _textareaVariants,
  textareaFieldStyle,
  textareaFieldVariants
} from "@shared/components/textarea";
import { useInputStateHandlers } from "../../hooks";

export const Textarea: FC<TextareaProps> = ({
  style = _textareaStyle,
  variants = _textareaVariants,
  labelStyle = textareaLabelStyle,
  labelVariants = textareaLabelVariants,
  fieldBoxStyle = textareaFieldBoxStyle,
  fieldBoxVariants = textareaFieldBoxVariants,
  placeholderStyle = textareaPlaceholderStyle,
  placeholderVariants = textareaPlaceholderVariants,
  textareaStyle = textareaFieldStyle,
  textareaVariants = textareaFieldVariants,
  size = 'medium',
  disabled = false,
  invalid = false,
  id = '',
  value = '',
  onChange = () => {},
  onInput = () => {},
  label = '',
  renderLabel = null,
  children = null,
  placeholder = '',
  renderPlaceholder = null,
  attributes = {}
}) => {
  const usableId = id ? id : useId()

  const {
    hoverState: [hover],
    focusState: [focus],
    handleMouseIn,
    handleMouseOut,
    handleFocus,
    handleBlur
  } = useInputStateHandlers(disabled)
  return <div
    className={cn({
      [style]: style,
      [variants[size]]: variants[size] && size,
      [variants.disabled]: variants.disabled && disabled,
      [variants.invalid]: variants.invalid && invalid,
      [variants.hover]: variants.hover && hover,
      [variants.focus]: variants.focus && focus
    })}
    onMouseEnter={handleMouseIn}
    onMouseLeave={handleMouseOut}
  >
    {renderLabel
      ? typeof renderLabel === 'function'
        ? renderLabel()
        : renderLabel
      : label && (
          <label
            htmlFor={usableId}
            className={cn({
              [labelStyle]: labelStyle,
              [labelVariants[size]]: labelVariants[size] && size,
              [labelVariants.disabled]: labelVariants.disabled && disabled,
              [labelVariants.invalid]: labelVariants.invalid && invalid,
              [labelVariants.hover]: labelVariants.hover && hover,
              [labelVariants.focus]: labelVariants.focus && focus,
              [labelVariants.filled]: labelVariants.filled && value
            })}
          >
            {label}
          </label>
        )
    }
    {children
      ? typeof children === 'function'
        ? children({
            id: usableId,
            hover, focus,
            handleFocus, handleBlur,
            handleMouseIn, handleMouseOut
          })
        : children
      : <div
          className={cn({
            [fieldBoxStyle]: fieldBoxStyle,
            [fieldBoxVariants[size]]: fieldBoxVariants[size] && size,
            [fieldBoxVariants.disabled]: fieldBoxVariants.disabled && disabled,
            [fieldBoxVariants.invalid]: fieldBoxVariants.invalid && invalid,
            [fieldBoxVariants.filled]: fieldBoxVariants.filled && value,
            [fieldBoxVariants.focus]: fieldBoxVariants.focus && focus,
            [fieldBoxVariants.hover]: fieldBoxVariants.hover && hover
          })}
        >
          {renderPlaceholder && (
            <div className={cn({
              [placeholderStyle]: placeholderStyle,
              [placeholderVariants[size]]: placeholderVariants[size] && size,
              [placeholderVariants.disabled]: placeholderVariants.disabled && disabled,
              [placeholderVariants.invalid]: placeholderVariants.invalid && invalid,
              [placeholderVariants.filled]: placeholderVariants.filled && value,
              [placeholderVariants.hover]: placeholderVariants.hover && hover,
              [placeholderVariants.focus]: placeholderVariants.focus && focus
            })}>
              {typeof renderPlaceholder === 'function'
                ? renderPlaceholder()
                : renderPlaceholder
              }
            </div>
          )}
          <textarea
            id={usableId}
            {...attributes}
            className={cn({
              [textareaStyle]: textareaStyle,
              [textareaVariants[size]]: textareaVariants[size] && size,
              [textareaVariants.disabled]: textareaVariants.disabled && disabled,
              [textareaVariants.invalid]: textareaVariants.invalid && invalid,
              [textareaVariants.filled]: textareaVariants.filled && value,
              [textareaVariants.hover]: textareaVariants.hover && hover,
              [textareaVariants.focus]: textareaVariants.focus && focus
            })}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e: SyntheticEvent) => onChange((e.target as HTMLTextAreaElement).value)}
            onInput={(e: SyntheticEvent) => onInput((e.target as HTMLTextAreaElement).value)}
          ></textarea>
        </div>
    }
  </div>
}