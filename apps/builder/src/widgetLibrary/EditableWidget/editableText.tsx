import { debounce } from "lodash-es"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { Input, PenIcon } from "@illa-design/react"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  applyLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
} from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"
import { EditableTextWidgetProps, WrappedEditableTextProps } from "./interface"
import { applyTextCss } from "./style"
import { getValidateMessageFunc } from "./utils"

export const WrappedEditableText: FC<WrappedEditableTextProps> = (props) => {
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
    maxLength,
    minLength,
    allowClear,
    className,
    handleOnChange,
  } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const [focus, setFocus] = useState(false)

  const handleClickOnSpan = () => {
    setFocus(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  return (
    <div css={containerStyle} className={className}>
      {focus ? (
        <Input
          w="100%"
          autoFocus
          onChange={handleOnChange}
          showWordLimit={showCharacterCount}
          onBlur={() => {
            setFocus(false)
          }}
          value={value}
          addAfter={suffixText}
          addBefore={prefixText}
          suffix={suffixIcon}
          prefix={prefixIcon}
          inputRef={inputRef}
          readOnly={readOnly}
          allowClear={allowClear}
          placeholder={placeholder}
          disabled={disabled}
          colorScheme={colorScheme}
          maxLength={maxLength}
          minLength={minLength}
          onClear={() => handleOnChange("")}
        />
      ) : (
        <span
          css={applyTextCss(!!(value && value?.length > 0))}
          onClick={handleClickOnSpan}
        >
          {value && value?.length > 0 ? value : placeholder}
          <PenIcon />
        </span>
      )}
    </div>
  )
}
WrappedEditableText.displayName = "WrappedEditableText"

export const EditableTextWidget: FC<EditableTextWidgetProps> = (props) => {
  const {
    displayName,
    value,
    minLength,
    maxLength,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    handleUpdateDsl,
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
    validateMessage,
    defaultValue,
    triggerEventHandler,
    handleUpdateMultiExecutionResult,
  } = props

  const [editableTextValue, setEditableTextValue] = useState(defaultValue)

  const handleValidate = useCallback(
    (value?: any) => {
      const message = getValidateMessageFunc(value, {
        hideValidationMessage: hideValidationMessage,
        pattern: pattern,
        regex: regex,
        minLength: minLength,
        maxLength: maxLength,
        required: required,
        customRule: customRule,
      })
      handleUpdateDsl({
        validateMessage: message,
      })
      return message
    },
    [
      customRule,
      handleUpdateDsl,
      hideValidationMessage,
      maxLength,
      minLength,
      pattern,
      regex,
      required,
    ],
  )

  useEffect(() => {
    setEditableTextValue(defaultValue)
    handleUpdateMultiExecutionResult([
      {
        displayName,
        value: {
          value: defaultValue || "",
        },
      },
    ])
  }, [defaultValue, displayName, handleUpdateMultiExecutionResult])

  useEffect(() => {
    updateComponentRuntimeProps({
      setValue: (value: string) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: undefined })
      },
      validate: () => {
        return handleValidate(value)
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    updateComponentRuntimeProps,
    handleUpdateDsl,
    deleteComponentRuntimeProps,
    handleValidate,
    value,
  ])

  const debounceOnChange = useRef(
    debounce(
      (
        value: string,
        triggerEventHandler: EditableTextWidgetProps["triggerEventHandler"],
        options?: {
          hideValidationMessage?: EditableTextWidgetProps["hideValidationMessage"]
          pattern?: EditableTextWidgetProps["pattern"]
          regex?: EditableTextWidgetProps["regex"]
          minLength?: EditableTextWidgetProps["minLength"]
          maxLength?: EditableTextWidgetProps["maxLength"]
          required?: EditableTextWidgetProps["required"]
          customRule?: EditableTextWidgetProps["customRule"]
        },
      ) => {
        new Promise((resolve) => {
          const message = getValidateMessageFunc(value, options)
          handleUpdateMultiExecutionResult([
            {
              displayName,
              value: {
                value: value || "",
                validateMessage: message,
              },
            },
          ])
          resolve(true)
        }).then(() => {
          triggerEventHandler("change")
        })
      },
      180,
    ),
  )

  const handleOnChange = useCallback(
    (value: string) => {
      setEditableTextValue(value)
      debounceOnChange.current(value, triggerEventHandler, {
        hideValidationMessage: hideValidationMessage,
        pattern: pattern,
        regex: regex,
        minLength: minLength,
        maxLength: maxLength,
        required: required,
        customRule: customRule,
      })
    },
    [
      customRule,
      hideValidationMessage,
      maxLength,
      minLength,
      pattern,
      regex,
      required,
      triggerEventHandler,
    ],
  )

  const handleOnBlur = useCallback(() => {
    triggerEventHandler("blur")
  }, [triggerEventHandler])

  const handleOnFocus = useCallback(() => {
    triggerEventHandler("focus")
  }, [triggerEventHandler])

  return (
    <AutoHeightContainer updateComponentHeight={updateComponentHeight}>
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
          <WrappedEditableText
            {...props}
            value={editableTextValue}
            handleOnChange={handleOnChange}
            handleOnBlur={handleOnBlur}
            handleOnFocus={handleOnFocus}
          />
        </div>
      </TooltipWrapper>
      {!hideValidationMessage && (
        <div
          css={applyValidateMessageWrapperStyle(
            labelWidth,
            labelPosition,
            labelHidden || !label,
          )}
        >
          <InvalidMessage validateMessage={validateMessage} />
        </div>
      )}
    </AutoHeightContainer>
  )
}
EditableTextWidget.displayName = "EditableTextWidget"
export default EditableTextWidget
