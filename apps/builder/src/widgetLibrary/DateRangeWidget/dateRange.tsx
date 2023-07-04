import dayjs, { Dayjs } from "dayjs"
import { FC, useCallback, useEffect, useMemo } from "react"
import { RangeDatePicker } from "@illa-design/react"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  applyLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
} from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { handleValidateCheck } from "../PublicSector/InvalidMessage/utils"
import { DateWidgetProps, WrappedDateRangeProps } from "./interface"

export const WrappedDateRange: FC<WrappedDateRangeProps> = (props) => {
  const {
    startValue,
    endValue,
    dateFormat,
    startPlaceholder,
    endPlaceholder,
    showClear,
    minDate,
    disabled,
    maxDate,
    colorScheme,
    handleOnChange,
    getValidateMessage,
    handleUpdateMultiExecutionResult,
    displayName,
    readOnly,
  } = props

  const changeValue = (value?: string[]) => {
    new Promise((resolve) => {
      const startMessage = getValidateMessage(value?.[0])
      const endMessage = getValidateMessage(value?.[1])
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: {
            startValue: value?.[0] || "",
            endValue: value?.[1] || "",
            validateMessage: startMessage || endMessage,
          },
        },
      ])
      resolve(true)
    }).then(() => {
      handleOnChange?.()
    })
  }

  const _placeholder = [startPlaceholder ?? "", endPlaceholder ?? ""]

  const dateRangeValue = useMemo(() => {
    return !startValue && !endValue ? undefined : [startValue, endValue]
  }, [startValue, endValue])

  const checkRange = useCallback(
    (current?: Dayjs) => {
      const beforeMinDate = minDate
        ? !!current?.isBefore(dayjs(minDate))
        : false
      const afterMaxDate = maxDate ? !!current?.isAfter(dayjs(maxDate)) : false
      return beforeMinDate || afterMaxDate
    },
    [minDate, maxDate],
  )

  return (
    <RangeDatePicker
      w="100%"
      editable={!readOnly}
      colorScheme={colorScheme}
      format={dateFormat}
      value={dateRangeValue}
      disabled={disabled}
      placeholder={_placeholder}
      allowClear={showClear}
      disabledDate={checkRange}
      onClear={() => {
        changeValue(["", ""])
      }}
      onChange={changeValue}
    />
  )
}

WrappedDateRange.displayName = "WrappedDateRange"

export const DateRangeWidget: FC<DateWidgetProps> = (props) => {
  const {
    startValue,
    endValue,
    endPlaceholder,
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
    updateComponentHeight,
    validateMessage,
    customRule,
    hideValidationMessage,
    triggerEventHandler,
  } = props

  const getValidateMessage = useCallback(
    (value?: unknown) => {
      if (!hideValidationMessage) {
        const message = handleValidateCheck({
          value,
          required,
          customRule,
        })
        const showMessage = message && message.length > 0
        return showMessage ? message : ""
      }
      return ""
    },
    [customRule, hideValidationMessage, required],
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
    updateComponentRuntimeProps({
      setStartValue: (startValue: string) => {
        handleUpdateDsl({ startValue })
      },
      setEndValue: (endValue: string) => {
        handleUpdateDsl({ endValue })
      },
      clearValue: () => {
        handleUpdateDsl({ startValue: undefined, endValue: undefined })
      },
      validate: () => {
        const startValueChecked = handleValidate(startValue)
        if (startValueChecked) {
          return startValueChecked
        }
        const endValueChecked = handleValidate(endValue)
        if (endPlaceholder) {
          return endValueChecked
        }
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    deleteComponentRuntimeProps,
    endPlaceholder,
    endValue,
    handleUpdateDsl,
    handleValidate,
    startValue,
    updateComponentRuntimeProps,
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
          <WrappedDateRange
            {...props}
            getValidateMessage={getValidateMessage}
            handleOnChange={handleOnChange}
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
DateRangeWidget.displayName = "DateRangeWidget"
export default DateRangeWidget
