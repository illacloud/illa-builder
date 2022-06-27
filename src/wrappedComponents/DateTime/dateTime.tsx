import { forwardRef, useCallback, useState } from "react"
import dayjs from "dayjs"
import { DatePicker } from "@illa-design/date-picker"
import { Wrapper } from "@/wrappedComponents/Wrapper"
import { TooltipWrapper } from "@/wrappedComponents/TooltipWrapper"
import { InvalidMessage } from "@/wrappedComponents/InvalidMessage"
import LabelWrapper from "@/wrappedComponents/LabelWrapper"
import { inputContainerCss } from "./style"
import { WrappedDateTimeProps } from "./interface"

export const WrappedDateTime = forwardRef<any, WrappedDateTimeProps>(
  (props, ref) => {
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
      colorScheme,
      minDate,
      disabled,
      maxDate,
      readOnly,
      minuteStep,
      timeFormat,
      hideValidationMessage,
      handleUpdateDsl,
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
          </LabelWrapper>
        </Wrapper>
      </TooltipWrapper>
    )
  },
)

WrappedDateTime.displayName = "WrappedDate"

export const DateTimeWidget = WrappedDateTime
