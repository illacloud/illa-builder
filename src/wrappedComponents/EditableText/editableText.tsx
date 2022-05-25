import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import Label from "../Label"
import { Wrapper } from "../Wrapper"
import { Input } from "@illa-design/input"
import { InvalidMessage } from "@/wrappedComponents/InvalidMessage"
import { inputContainerCss, textCss } from "./style"
import { PenIcon } from "@illa-design/icon"
import { WrappedInputProps, WrappedInputRefType } from "../Input/interface"
import { withParser } from "@/wrappedComponents/parserHOC"

export const WrappedEditableText = forwardRef<
  WrappedInputRefType,
  WrappedInputProps
>((props, ref) => {
  const {
    defaultValue,
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

  const [currentValue, setCurrentValue] = useState(defaultValue)
  useEffect(() => {
    setCurrentValue(value)
  }, [value])
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
    <Wrapper>
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
            value={value}
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
  )
})

export const EditableTextWidget = withParser(WrappedEditableText)
WrappedEditableText.displayName = "WrappedInput"
