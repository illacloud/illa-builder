import { forwardRef, useCallback, useState } from "react"
import dayjs from "dayjs"
import { Wrapper } from "@/wrappedComponents/Wrapper"
import { TooltipWrapper } from "@/wrappedComponents/TooltipWrapper"
import { DatePicker } from "@illa-design/date-picker"
import { InvalidMessage } from "@/wrappedComponents/InvalidMessage"
import { inputContainerCss } from "./style"
import { WrappedDateProps } from "./interface"
import LabelWrapper from "../LabelWrapper"

export const WrappedDate = forwardRef<any, WrappedDateProps>((props) => {
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
    hideValidationMessage,
    handleUpdateDsl
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
              colorScheme={colorScheme}
              defaultValue={defaultValue}
              format={dateFormat}
              value={value}
              readOnly={readOnly}
              disabled={disabled}
              placeholder={placeholder}
              allowClear={showClear}
              disabledDate={checkRange}
              // todo @aoao handleUpdateDsl?
              onClear={() => setCurrentValue("")}
              onChange={(value) => {
                setCurrentValue(value)
                handleUpdateDsl?.({ value })
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
})

WrappedDate.displayName = "WrappedDate"

export const DateWidget = WrappedDate
