import { FC, useCallback, useEffect, useMemo } from "react"
import dayjs from "dayjs"
import { DateRangePicker } from "@illa-design/date-picker"
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
    minDate,
    disabled,
    maxDate,
    readOnly,
    colorScheme,
    handleUpdateDsl,
  } = props

  const _placeholder = [startPlaceholder ?? "", endPlaceholder ?? ""]

  const dateRangeValue = useMemo(() => {
    return [startValue, endValue]
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
    minDate,
    disabled,
    maxDate,
    readOnly,
    colorScheme,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    displayName,
    handleUpdateDsl,
  } = props

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
  ])
  return <WrappedDateRange {...props} />
}
DateRangeWidget.displayName = "DateRangeWidget"
