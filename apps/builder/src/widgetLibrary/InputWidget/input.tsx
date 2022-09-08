import { FC, forwardRef, useEffect, useRef, useState } from "react"
import { Input } from "@illa-design/input"
import { InputWidgetProps, WrappedInputProps } from "./interface"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import {
  applyLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
} from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

export const WrappedInput = forwardRef<HTMLInputElement, WrappedInputProps>(
  (props, ref) => {
    const {
      value,
      placeholder,
      disabled,
      readOnly,
      prefixIcon,
      prefixText,
      suffixIcon,
      suffixText,
      showCharacterCount,
      colorScheme,
      handleUpdateDsl,
      handleOnChange,
      allowClear,
      maxLength,
      minLength,
    } = props

    const [_value, setValue] = useState(value)

    return (
      <Input
        w="100%"
        inputRef={ref}
        value={_value}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        prefix={prefixIcon}
        addonBefore={{ render: prefixText, custom: false }}
        suffix={suffixIcon}
        addonAfter={{ render: suffixText, custom: false }}
        onChange={(value) => {
          setValue(value)
          new Promise((resolve) => {
            handleUpdateDsl({ value })
            resolve(true)
          }).then(() => {
            handleOnChange?.()
          })
        }}
        showCount={showCharacterCount}
        borderColor={colorScheme}
        allowClear={allowClear}
        onClear={() => {
          handleUpdateDsl({ value: "" })
        }}
        maxLength={maxLength}
        minLength={minLength}
      />
    )
  },
)
WrappedInput.displayName = "WrappedInput"

export const InputWidget: FC<InputWidgetProps> = (props) => {
  const {
    value,
    placeholder,
    disabled,
    readOnly,
    prefixIcon,
    prefixText,
    suffixIcon,
    suffixText,
    showCharacterCount,
    colorScheme,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    allowClear,
    minLength,
    maxLength,
    labelPosition,
    labelFull,
    label,
    labelAlign,
    labelWidth = 33,
    labelCaption,
    labelWidthUnit,
    required,
    labelHidden,
    tooltipText,
    pattern,
    regex,
    customRule,
    hideValidationMessage,
    updateComponentHeight,
  } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const inputWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inputWrapperRef.current) {
      updateComponentHeight(inputWrapperRef.current?.clientHeight)
    }
  }, [
    value,
    pattern,
    regex,
    minLength,
    maxLength,
    required,
    customRule,
    hideValidationMessage,
    labelPosition,
  ])

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      value,
      placeholder,
      disabled,
      readOnly,
      prefixIcon,
      prefixText,
      suffixIcon,
      suffixText,
      showCharacterCount,
      colorScheme,
      allowClear,
      minLength,
      maxLength,
      focus: () => {
        inputRef.current?.focus()
      },
      setValue: (value: boolean | string | number | void) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: undefined })
      },
      validate: () => {},
      clearValidation: () => {},
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    value,
    placeholder,
    disabled,
    readOnly,
    prefixIcon,
    prefixText,
    suffixIcon,
    suffixText,
    showCharacterCount,
    colorScheme,
    displayName,
    allowClear,
    minLength,
    maxLength,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])
  return (
    <div ref={inputWrapperRef}>
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <div css={applyLabelAndComponentWrapperStyle(labelPosition)}>
          <Label
            labelFull={labelFull}
            label={label}
            labelAlign={labelAlign}
            labelWidth={labelWidth}
            labelCaption={labelCaption}
            labelWidthUnit={labelWidthUnit}
            labelPosition={labelPosition}
            required={required}
            labelHidden={labelHidden}
            hasTooltip={!!tooltipText}
          />
          <WrappedInput {...props} ref={inputRef} />
        </div>
      </TooltipWrapper>

      <div
        css={applyValidateMessageWrapperStyle(
          labelWidth,
          labelPosition,
          labelHidden || !label,
        )}
      >
        <InvalidMessage
          value={value}
          pattern={pattern}
          regex={regex}
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          customRule={customRule}
          hideValidationMessage={hideValidationMessage}
        />
      </div>
    </div>
  )
}

InputWidget.displayName = "InputWidget"
