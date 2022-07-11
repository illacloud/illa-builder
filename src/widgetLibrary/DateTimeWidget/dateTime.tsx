import { forwardRef, useCallback, useEffect, useState } from "react"
import dayjs from "dayjs"
import { DatePicker } from "@illa-design/date-picker"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { WrappedDateTimeProps } from "./interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"

export const WrappedDateTime = forwardRef<any, WrappedDateTimeProps>(
  (props, ref) => {
    const {
      value,
      dateFormat,
      placeholder,
      showClear,
      required,
      minDate,
      disabled,
      maxDate,
      readOnly,
      minuteStep,
      timeFormat,
      hideValidationMessage,
      colorScheme,
      handleUpdateDsl,
      displayName,
      handleUpdateGlobalData,
      handleDeleteGlobalData,
    } = props

    const [currentValue, setCurrentValue] = useState(value)

    const checkRange = useCallback(
      (current) => {
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

    useEffect(() => {
      handleUpdateGlobalData(displayName, {
        value,
        dateFormat,
        placeholder,
        showClear,
        required,
        minDate,
        disabled,
        maxDate,
        readOnly,
        minuteStep,
        timeFormat,
        hideValidationMessage,
        colorScheme,
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
      required,
      minDate,
      disabled,
      maxDate,
      readOnly,
      minuteStep,
      timeFormat,
      hideValidationMessage,
      colorScheme,
    ])

    return (
      <div css={containerStyle}>
        <DatePicker
          showTime={{ step: { minute: minuteStep }, format: timeFormat }}
          colorScheme={colorScheme}
          format={dateFormat}
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          placeholder={placeholder}
          allowClear={showClear}
          disabledDate={checkRange}
          onClear={() => {
            setCurrentValue(undefined)
            handleUpdateDsl({ value: "" })
          }}
          onChange={(value) => {
            setCurrentValue(value)
            handleUpdateDsl({ value })
          }}
        />
        <InvalidMessage
          value={currentValue}
          required={required}
          hideValidationMessage={hideValidationMessage}
        />
      </div>
    )
  },
)

WrappedDateTime.displayName = "WrappedDate"

export const DateTimeWidget = WrappedDateTime
