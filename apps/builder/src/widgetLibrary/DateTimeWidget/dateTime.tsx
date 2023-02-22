import dayjs, { Dayjs } from "dayjs"
import { FC, forwardRef, useCallback, useEffect, useRef } from "react"
import { SingleDatePicker } from "@illa-design/react"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { handleValidateCheck } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  applyLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
} from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { DateTimeWidgetProps, WrappedDateTimeProps } from "./interface"

export const WrappedDateTime = forwardRef<any, WrappedDateTimeProps>(
  (props, ref) => {
    const {
      value,
      format,
      placeholder,
      showClear,
      minDate,
      disabled,
      maxDate,
      minuteStep,
      colorScheme,
      handleOnChange,
      getValidateMessage,
      handleUpdateMultiExecutionResult,
      displayName,
      readOnly,
    } = props

    const changeValue = (value?: unknown) => {
      new Promise((resolve) => {
        const message = getValidateMessage(value)
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
        handleOnChange?.()
      })
    }

    const checkRange = useCallback(
      (current?: Dayjs) => {
        const beforeMinDate = minDate
          ? !!current?.isBefore(dayjs(minDate))
          : false
        const afterMaxDate = maxDate
          ? !!current?.isAfter(dayjs(maxDate))
          : false
        return beforeMinDate || afterMaxDate
      },
      [minDate, maxDate],
    )

    return (
      <SingleDatePicker
        w="100%"
        showTime={{ step: { minute: minuteStep }, format }}
        colorScheme={colorScheme}
        format={format}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        allowClear={showClear}
        disabledDate={checkRange}
        onClear={() => {
          changeValue("")
        }}
        onChange={changeValue}
        editable={!readOnly}
      />
    )
  },
)

WrappedDateTime.displayName = "WrappedDateTime"

export const DateTimeWidget: FC<DateTimeWidgetProps> = (props) => {
  const {
    value,
    format,
    placeholder,
    showClear,
    minDate,
    disabled,
    maxDate,
    minuteStep,
    colorScheme,
    displayName,
    readOnly,
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
    updateComponentHeight,
    validateMessage,
    triggerEventHandler,
  } = props

  const getValidateMessage = useCallback(
    (value?: unknown) => {
      if (!hideValidationMessage) {
        const message = handleValidateCheck({
          value,
          required,
          customRule,
          pattern,
          regex,
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
      value,
      format,
      placeholder,
      showClear,
      minDate,
      disabled,
      maxDate,
      minuteStep,
      colorScheme,
      readOnly,
      setValue: (value: string) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: "" })
      },
      validate: () => {
        return handleValidate(value)
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    value,
    format,
    placeholder,
    showClear,
    minDate,
    disabled,
    maxDate,
    minuteStep,
    colorScheme,
    readOnly,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
    handleValidate,
  ])

  const handleOnChange = useCallback(() => {
    triggerEventHandler("change")
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
          <WrappedDateTime
            {...props}
            getValidateMessage={getValidateMessage}
            handleOnChange={handleOnChange}
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

DateTimeWidget.displayName = "DateTimeWidget"
