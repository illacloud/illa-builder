import { FC, forwardRef, useCallback, useEffect, useMemo, useRef } from "react"
import { InputNumber, LoadingIcon } from "@illa-design/react"
import {
  NumberInputWidgetProps,
  WrappedNumberInputProps,
} from "@/widgetLibrary/NumberInputWidget/interface"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { handleValidateCheck } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  applyLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
} from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"

const parserThousand = (value: number | string) =>
  `${value}`.replace(/\d+/, function (s) {
    return s.replace(/(\d)(?=(\d{3})+$)/g, "$1,")
  })

export const WrappedInputNumber = forwardRef<
  HTMLInputElement,
  WrappedNumberInputProps
>((props, ref) => {
  const {
    openThousandSeparator,
    max,
    min,
    placeholder,
    value,
    precision,
    disabled,
    readOnly,
    prefix,
    suffix,
    loading,
    colorScheme,
    displayName,
    handleOnChange,
    handleUpdateMultiExecutionResult,
    getValidateMessage,
  } = props

  const changeValue = (value?: number | undefined) => {
    new Promise((resolve) => {
      const message = getValidateMessage(value)
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: {
            value: value === undefined ? "" : value,
            validateMessage: message,
          },
        },
      ])
      resolve(true)
    }).then(() => {
      handleOnChange?.()
    })
  }

  const formatDisplayValue = useMemo(() => {
    return openThousandSeparator ? parserThousand : undefined
  }, [openThousandSeparator])

  const finalSuffix = useMemo(() => {
    if (loading) {
      return <LoadingIcon spin />
    }
    return suffix
  }, [loading, suffix])

  return (
    <InputNumber
      ref={ref}
      max={max}
      min={min}
      formatter={formatDisplayValue}
      placeholder={placeholder}
      value={value}
      precision={Number(precision)}
      disabled={disabled}
      readOnly={readOnly}
      prefix={prefix}
      suffix={finalSuffix}
      mode="button"
      onChange={changeValue}
      colorScheme={colorScheme}
    />
  )
})
WrappedInputNumber.displayName = "WrappedInputNumber"
export const NumberInputWidget: FC<NumberInputWidgetProps> = (props) => {
  const {
    openThousandSeparator,
    max,
    min,
    placeholder,
    value,
    precision,
    disabled,
    readOnly,
    prefix,
    suffix,
    loading,
    colorScheme,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    displayName,
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
    triggerEventHandler,
  } = props
  const numberInputRef = useRef<HTMLInputElement>(null)

  const getValidateMessage = useCallback(
    (value?: unknown) => {
      if (!hideValidationMessage) {
        const message = handleValidateCheck({
          value,
          pattern,
          regex,
          required,
          customRule,
        })
        const showMessage = message && message.length > 0
        return showMessage ? message : ""
      }
      return ""
    },
    [customRule, hideValidationMessage, pattern, regex, required],
  )

  const handleValidate = useCallback(
    (value?: unknown) => {
      const message = getValidateMessage(value)
      handleUpdateDsl({
        validateMessage: message,
      })
      return message
    },
    [getValidateMessage, handleUpdateDsl],
  )

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      openThousandSeparator,
      max,
      min,
      placeholder,
      value,
      precision,
      disabled,
      readOnly,
      prefix,
      suffix,
      loading,
      colorScheme,
      focus: () => {
        numberInputRef.current?.focus()
      },
      setValue: (value: number) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: 0 })
      },
      validate: () => {
        return handleValidate(value)
      },
      clearValidation: () => {
        handleUpdateDsl({
          validateMessage: "",
        })
      },
    })

    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    openThousandSeparator,
    max,
    min,
    placeholder,
    value,
    precision,
    disabled,
    readOnly,
    prefix,
    suffix,
    loading,
    colorScheme,
    displayName,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
    handleValidate,
  ])

  const handleOnChange = useCallback(() => {
    triggerEventHandler("change")
  }, [triggerEventHandler])

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
          <WrappedInputNumber
            {...props}
            ref={numberInputRef}
            getValidateMessage={getValidateMessage}
            handleOnChange={handleOnChange}
            handleOnBlur={handleOnBlur}
            handleOnFocus={handleOnFocus}
          />
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
    </AutoHeightContainer>
  )
}
NumberInputWidget.displayName = "NumberInputWidget"
