import { forwardRef, useImperativeHandle, useRef, useState } from "react"

import { WrapperEditableTextProps } from "./interface"
import Label from "../Label"
import { Wrapper } from "../Wrapper"
import { Input } from "@illa-design/input"
import { InvalidMessage } from "../InValidMessage"
import { inputContainerCss, textCss } from "./style"
import { PenIcon } from "@illa-design/icon"
import { WrappedInputRefType } from "../Input/interface"

export const WrappedEditableText = forwardRef<
  WrappedInputRefType,
  WrapperEditableTextProps
>((props, ref) => {
  const {
    showCharacterCount,
    value,
    onChange,
    onBlur,
    label,
    labelPosition,
    labelAlign,
    labelCaption,
    labelWidth,
    labelWidthUnit,
    pattern,
    regex,
    minLength,
    maxLength,
    required,
    customRule,
    hideValidationMessage,
    prefixText,
    prefixIcon,
    suffixIcon,
    suffixText,
    ...res
  } = props

  const [currentValue, setCurrentValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)
  const [focus, setFocus] = useState(false)

  useImperativeHandle(
    ref,
    () => {
      return {
        _inputRef: inputRef.current,
        validate: () => {}, // todo@aoao 未确定实现
        focus: () => {
          setFocus(true)
        },
      }
    },
    [],
  )

  return (
    <div>
      <Wrapper w={"200px"}>
        <Label
          label={label}
          labelPosition={labelPosition}
          labelAlign={labelAlign}
          labelCaption={labelCaption}
          labelWidth={labelWidth}
          labelWidthUnit={labelWidthUnit}
        />
        <div css={inputContainerCss}>
          {focus ? (
            <Input
              style={{ width: `100%` }}
              autoFocus
              onChange={(value) => {
                setCurrentValue(value)
                onChange && onChange(value)
              }}
              {...res}
              showCount={showCharacterCount}
              onBlur={() => {
                setFocus(false)
                onBlur && onBlur()
              }}
              value={currentValue}
              addonAfter={{ render: suffixText }}
              addonBefore={{ render: prefixText }}
              suffix={{ render: suffixIcon }}
              prefix={{ render: prefixIcon }}
              ref={inputRef}
            />
          ) : (
            <span
              css={textCss}
              onClick={() => {
                setFocus(true)
              }}
            >
              {currentValue}
              <PenIcon />
            </span>
          )}

          <InvalidMessage
            value={currentValue}
            pattern={pattern}
            regex={regex}
            minLength={minLength}
            maxLength={maxLength}
            required={required}
            customRule={customRule}
            hideValidationMessage={hideValidationMessage}
          />
        </div>
      </Wrapper>
    </div>
  )
})
WrappedEditableText.displayName = "WrappedInput"
