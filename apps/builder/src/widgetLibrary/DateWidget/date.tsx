import { FC, useCallback, useEffect } from "react"
import dayjs from "dayjs"
import { DatePicker } from "@illa-design/date-picker"
import { DateWidgetProps, WrappedDateProps } from "./interface"

export const WrappedDate: FC<WrappedDateProps> = props => {
  const {
    value,
    dateFormat,
    placeholder,
    showClear,
    minDate,
    disabled,
    maxDate,
    readOnly,
    colorScheme,
    handleUpdateDsl,
  } = props

  const checkRange = useCallback(
    current => {
      const beforeMinDate = minDate
        ? !!current?.isBefore(dayjs(minDate))
        : false
      const afterMaxDate = maxDate ? !!current?.isAfter(dayjs(maxDate)) : false
      return beforeMinDate || afterMaxDate
    },
    [minDate, maxDate],
  )

  return (
    <DatePicker
      colorScheme={colorScheme}
      format={dateFormat}
      value={value}
      readOnly={readOnly}
      disabled={disabled}
      placeholder={placeholder}
      allowClear={showClear}
      disabledDate={checkRange}
      onClear={() => {
        handleUpdateDsl({ value: "" })
      }}
      onChange={value => {
        handleUpdateDsl({ value })
      }}
    />
  )
}

WrappedDate.displayName = "WrappedDate"

export const DateWidget: FC<DateWidgetProps> = props => {
  const {
    value,
    dateFormat,
    placeholder,
    showClear,
    minDate,
    disabled,
    maxDate,
    readOnly,
    colorScheme,
    handleUpdateDsl,
    displayName,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      value,
      dateFormat,
      placeholder,
      showClear,
      minDate,
      disabled,
      maxDate,
      readOnly,
      colorScheme,
      displayName,
      setValue: (value: string) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: "" })
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    value,
    dateFormat,
    placeholder,
    showClear,
    minDate,
    disabled,
    maxDate,
    readOnly,
    colorScheme,
  ])

  return <WrappedDate {...props} />
}
DateWidget.displayName = "DateWidget"
