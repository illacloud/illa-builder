import { FC, useCallback, useState } from "react"
import { WrappedDateTimeProps } from "./interface"
import { Wrapper } from "@/wrappedComponents/Wrapper"
import { withParser } from "@/wrappedComponents/parserHOC"
import { TooltipWrapper } from "@/wrappedComponents/TooltipWrapper"
import { DatePicker } from "@illa-design/date-picker"
import LabelWrapper from "../LabelWrapper"
import { InvalidMessage } from "@/wrappedComponents/InvalidMessage"
import dayjs from "dayjs"
import { inputContainerCss } from "./style"

export const WrappedDateTime: FC<WrappedDateTimeProps> = (props) => {
  const {
    value,
    tooltipText,
    dateFormat,
    placeholder,
    showClear,
    label,
    labelAlign,
    labelWidth,
    labelPosition,
    labelCaption,
    labelWidthUnit,
    required,
    defaultValue,
    colorScheme,
    minDate,
    disabled,
    maxDate,
    readOnly,
    minuteStep,
    timeFormat,
    hideValidationMessage,
  } = props

  const [currentValue, setCurrentValue] = useState(value ?? defaultValue)

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
    <TooltipWrapper
      tooltipText={tooltipText}
      disabled={!tooltipText}
      position="tl"
    >
      <Wrapper alignment="fullWidth">
        <LabelWrapper
          label={label}
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          labelCaption={labelCaption}
          labelWidthUnit={labelWidthUnit}
          labelPosition={labelPosition}
          required={required}
          tooltipText={tooltipText}
        >
          <div css={inputContainerCss}>
            <DatePicker
              showTime={{ step: { minute: minuteStep }, format: timeFormat }}
              colorScheme={colorScheme}
              defaultValue={defaultValue}
              format={dateFormat}
              value={value}
              readOnly={readOnly}
              disabled={disabled}
              placeholder={placeholder}
              allowClear={showClear}
              disabledDate={checkRange}
              onClear={() => setCurrentValue(undefined)}
              onChange={(value) => {
                setCurrentValue(value)
              }}
            />
            <InvalidMessage
              value={currentValue}
              required={required}
              hideValidationMessage={hideValidationMessage}
            />
          </div>
        </LabelWrapper>
      </Wrapper>
    </TooltipWrapper>
  )
}

WrappedDateTime.displayName = "WrappedDate"

export const DateTimeWidget = withParser(WrappedDateTime)
