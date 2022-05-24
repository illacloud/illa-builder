import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { WrappedInputProps, WrappedInputRefType } from "./interface"
import Label from "../Label"
import { Wrapper } from "../Wrapper"
import { Input } from "@illa-design/input"
import { inputContainerCss } from "./style"
import { InvalidMessage } from "../InvalidMessage"

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
      ...res
    } = props

    const [currentValue, setCurrentValue] = useState(value)
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(
      ref,
      () => {
        return {
          _inputRef: inputRef.current,
          validate: () => {}, // todo@aoao 未确定实现
          focus: () => {
            console.log(inputRef.current)
            inputRef.current?.focus()
          },
        }
      },
      [],
    )

    return (
      <Wrapper w={"300px"}>
        <Label
          label={label}
          labelPosition={labelPosition}
          labelAlign={labelAlign}
          labelCaption={labelCaption}
          labelWidth={labelWidth}
          labelWidthUnit={labelWidthUnit}
        />
        <div css={inputContainerCss}>
          <Input
            onChange={(value) => {
              setCurrentValue(value)
              onChange && onChange(value)
            }}
            {...res}
            addonAfter={{ render: suffixText }}
            addonBefore={{ render: prefixText }}
            suffix={{ render: suffixIcon }}
            prefix={{ render: prefixIcon }}
            showCount={showCharacterCount}
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
      </Wrapper>
    )
  },
)
WrappedInput.displayName = "WrappedInput"
