import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { WrappedInputProps, WrappedInputRefType } from "./interface"
import { Wrapper } from "@/wrappedComponents/Wrapper"
import { Input } from "@illa-design/input"
import { InvalidMessage } from "@/wrappedComponents/InvalidMessage"
import { inputContainerCss } from "./style"
import { withParser } from "@/wrappedComponents/parserHOC"
import LabelWrapper from "@/wrappedComponents/LabelWrapper"

export const WrappedInput = forwardRef<WrappedInputRefType, WrappedInputProps>(
  (props, ref) => {
    const {
      showCharacterCount,
      value,
      onChange,
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
      tooltipText,
      showClear,
      defaultValue,
      placeholder,
      handleUpdateDsl,
    } = props

    const [currentValue, setCurrentValue] = useState(defaultValue)
    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(
      ref,
      () => {
        return {
          _inputRef: inputRef.current,
          validate: () => {}, // todo@aoao 未确定实现
          focus: () => {
            inputRef.current?.focus()
          },
        }
      },
      [],
    )

    return (
      <Wrapper w={"300px"}>
        <LabelWrapper
          label={label}
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          labelCaption={labelCaption}
          labelWidthUnit={labelWidthUnit}
          labelPosition={labelPosition}
          required={required}
          tooltipText={tooltipText}
        >
          <div css={inputContainerCss}>
            <Input
              onChange={(value) => {
                handleUpdateDsl({ value })
                setCurrentValue(value)
                onChange && onChange(value)
              }}
              placeholder={placeholder}
              addonAfter={{ render: suffixText }}
              addonBefore={{ render: prefixText }}
              suffix={{ render: suffixIcon }}
              prefix={{ render: prefixIcon }}
              showCount={showCharacterCount}
              allowClear={showClear}
              value={value}
              inputRef={inputRef}
            />
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
        </LabelWrapper>
      </Wrapper>
    )
  },
)
export const InputWidget = withParser(WrappedInput)

WrappedInput.displayName = "WrappedInput"
