import { FC, useState } from "react"
import { WrappedDateProps } from "./interface"
import { Wrapper } from "@/wrappedComponents/Wrapper"
import { withParser } from "@/wrappedComponents/parserHOC"
import { TooltipWrapper } from "@/wrappedComponents/TooltipWrapper"
import { DatePicker } from "@illa-design/date-picker"
import LabelWrapper from "../LabelWrapper"
import { InvalidMessage } from "@/wrappedComponents/InvalidMessage"
import dayjs from "dayjs"
import { inputContainerCss } from "./style"

export const WrappedDate: FC<WrappedDateProps> = (props) => {
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
  } = props

  const [currentValue, setCurrentValue] = useState(value ?? defaultValue)

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
              disabledDate={(current) =>
                current
                  ? current.isBefore(dayjs(minDate)) ||
                    current.isAfter(dayjs(maxDate))
                  : false
              }
              onClear={() => setCurrentValue("")}
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

WrappedDate.displayName = "WrappedDate"

export const DateWidget = withParser(WrappedDate)
