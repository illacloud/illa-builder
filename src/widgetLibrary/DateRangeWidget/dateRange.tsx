import { FC, useCallback, useEffect, useMemo } from "react"
import dayjs from "dayjs"
import { DateRangePicker } from "@illa-design/date-picker"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { invalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"
import { DateWidgetProps, WrappedDateRangeProps } from "./interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"

export const WrappedDateRange: FC<WrappedDateRangeProps> = (props) => {
  const {
    startValue,
    endValue,
    dateFormat,
    startPlaceholder,
    endPlaceholder,
    showClear,
    required,
    minDate,
    disabled,
    maxDate,
    readOnly,
    customRule,
    hideValidationMessage,
    colorScheme,
    handleUpdateDsl,
  } = props

  const _placeholder = [startPlaceholder ?? "", endPlaceholder ?? ""]

  const dateRangeValue = useMemo(() => {
    return [startValue, endValue]
  }, [startValue, endValue])

  const _customValue = useMemo(() => {
    if (customRule) {
      return customRule
    } else if (required && !startValue && !endValue) {
      return invalidMessage.get("required")
    }
  }, [customRule, required, startValue, endValue])

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
    <div css={containerStyle}>
      <DateRangePicker
        colorScheme={colorScheme}
        format={dateFormat}
        value={dateRangeValue}
        readOnly={readOnly}
        disabled={disabled}
        placeholder={_placeholder}
        allowClear={showClear}
        disabledDate={checkRange}
        // todo @aoao handleUpdateDsl?
        onClear={() => {
          handleUpdateDsl({ value: [] })
        }}
        onChange={(value) => {
          handleUpdateDsl({ value })
        }}
      />
      <InvalidMessage
        customRule={_customValue}
        hideValidationMessage={hideValidationMessage}
      />
    </div>
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
    required,
    minDate,
    disabled,
    maxDate,
    readOnly,
    customRule,
    hideValidationMessage,
    colorScheme,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    displayName,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      startValue,
      endValue,
      dateFormat,
      startPlaceholder,
      endPlaceholder,
      showClear,
      required,
      minDate,
      disabled,
      maxDate,
      readOnly,
      customRule,
      hideValidationMessage,
      colorScheme,
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
    required,
    minDate,
    disabled,
    maxDate,
    readOnly,
    customRule,
    hideValidationMessage,
    colorScheme,
  ])
  return <WrappedDateRange {...props} />
}
