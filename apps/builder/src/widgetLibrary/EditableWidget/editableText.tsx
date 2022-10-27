import { FC, useCallback, useEffect, useRef, useState } from "react"
import { PenIcon } from "@illa-design/icon"
import { Input } from "@illa-design/input"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"
import { EditableTextWidgetProps, WrappedEditableTextProps } from "./interface"
import { applyTextCss } from "./style"
import {
  applyLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
} from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { handleValidateCheck } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"

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
    handleUpdateDsl,
    maxLength,
    minLength,
    allowClear,
    className,
  } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const [focus, setFocus] = useState(false)

  return (
    <div css={containerStyle} className={className}>
      {focus ? (
        <Input
          autoFocus
          onChange={(value) => {
            handleUpdateDsl({ value })
          }}
          showCount={showCharacterCount}
          onBlur={() => {
            setFocus(false)
          }}
          value={value}
          addonAfter={{ render: suffixText }}
          addonBefore={{ render: prefixText }}
          suffix={{ render: suffixIcon }}
          prefix={{ render: prefixIcon }}
          ref={inputRef}
          readOnly={readOnly}
          allowClear={allowClear}
          placeholder={placeholder}
          disabled={disabled}
          borderColor={colorScheme}
          maxLength={maxLength}
          minLength={minLength}
          onClear={() => handleUpdateDsl({ value: "" })}
        />
      ) : (
        <span
          css={applyTextCss(!!(value && value?.length > 0))}
          onClick={() => {
            setFocus(true)
          }}
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
    minLength,
    maxLength,
    allowClear,
    displayName,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
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
    validateMessage,
  } = props

  const handleValidate = useCallback(
    (value?: any) => {
      const message = handleValidateCheck({
        value,
        required,
        customRule,
        pattern,
        regex,
        minLength,
        maxLength,
      })
      const showMessage =
        !hideValidationMessage && message && message.length > 0
      if (showMessage) {
        handleUpdateDsl({
          validateMessage: message,
        })
      } else {
        handleUpdateDsl({
          validateMessage: "",
        })
      }
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
    handleUpdateGlobalData(displayName, {
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
      minLength,
      maxLength,
      allowClear,
      setValue: (value: string) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: undefined })
      },
      validate: () => {
        handleValidate(value)
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
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
    minLength,
    maxLength,
    allowClear,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
    handleValidate,
  ])
  return (
    <>
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
          <WrappedEditableText {...props} />
        </div>
      </TooltipWrapper>
      <div
        css={applyValidateMessageWrapperStyle(
          labelWidth,
          labelPosition,
          labelHidden || !label,
        )}
      >
        <InvalidMessage validateMessage={validateMessage} />
      </div>
    </>
  )
}
EditableTextWidget.displayName = "EditableTextWidget"
