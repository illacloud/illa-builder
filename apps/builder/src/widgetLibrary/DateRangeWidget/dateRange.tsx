import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import dayjs from "dayjs"
import { DateRangePicker } from "@illa-design/react"
import { DateWidgetProps, WrappedDateRangeProps } from "./interface"
import {
  applyLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
} from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { handleValidateCheck } from "../PublicSector/InvalidMessage/utils"

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
    readOnly,
    colorScheme,
    handleOnChange,
    getValidateMessage,
    handleUpdateMultiExecutionResult,
    displayName,
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
    (current) => {
      const beforeMinDate = minDate
        ? !!current?.isBefore(dayjs(minDate))
        : false
      const afterMaxDate = maxDate ? !!current?.isAfter(dayjs(maxDate)) : false
      return beforeMinDate || afterMaxDate
    },
    [minDate, maxDate],
  )

  return (
    <DateRangePicker
      w="100%"
      colorScheme={colorScheme}
      format={dateFormat}
      value={dateRangeValue}
      readOnly={readOnly}
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
    dateFormat,
    startPlaceholder,
    endPlaceholder,
    showClear,
    minDate,
    disabled,
    maxDate,
    readOnly,
    colorScheme,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    displayName,
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
    handleUpdateGlobalData(displayName, {
      startValue,
      endValue,
      dateFormat,
      startPlaceholder,
      endPlaceholder,
      showClear,
      minDate,
      disabled,
      maxDate,
      readOnly,
      colorScheme,
      setStartValue: (startValue: string) => {
        handleUpdateDsl({ startValue })
      },
      setEndValue: (endValue: string) => {
        handleUpdateDsl({ endValue })
      },
      clearValue: () => {
        handleUpdateDsl({ startValue: "", endValue: "" })
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
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    startValue,
    endValue,
    dateFormat,
    startPlaceholder,
    endPlaceholder,
    showClear,
    minDate,
    disabled,
    maxDate,
    readOnly,
    colorScheme,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
    handleValidate,
  ])

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef.current) {
      updateComponentHeight(wrapperRef.current?.clientHeight)
    }
  }, [required, labelPosition, validateMessage, updateComponentHeight])

  return (
    <div ref={wrapperRef}>
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
    </div>
  )
}
DateRangeWidget.displayName = "DateRangeWidget"
