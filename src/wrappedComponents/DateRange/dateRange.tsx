import { FC, useCallback, useMemo } from "react"
import dayjs from "dayjs"
import { Wrapper } from "@/wrappedComponents/Wrapper"
import { withParser } from "@/wrappedComponents/parserHOC"
import { TooltipWrapper } from "@/wrappedComponents/TooltipWrapper"
import { DateRangePicker } from "@illa-design/date-picker"
import { InvalidMessage } from "@/wrappedComponents/InvalidMessage"
import { invalidMessage } from "@/wrappedComponents/InvalidMessage/utils"
import LabelWrapper from "../LabelWrapper"
import { inputContainerCss } from "./style"
import { WrappedDateRangeProps } from "./interface"

export const WrappedDateRange: FC<WrappedDateRangeProps> = (props) => {
  const {
    value,
    tooltipText,
    dateFormat,
    startPlaceholder,
    endPlaceholder,
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
    customRule,
    hideValidationMessage,
  } = props

  const _placeholder = [startPlaceholder ?? "", endPlaceholder ?? ""]

  const _customValue = useMemo(() => {
    if (customRule) {
      return customRule
    } else if (required && !value) {
      return invalidMessage.get("required")
    }
  }, [customRule, required, value])

  const checkRange = useCallback((current) => {
    const beforeMinDate = minDate ? !!current?.isBefore(dayjs(minDate)) : false
    const afterMaxDate = maxDate ? !!current?.isAfter(dayjs(maxDate)) : false
    return beforeMinDate || afterMaxDate
  }, [])

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
            <DateRangePicker
              colorScheme={colorScheme}
              defaultValue={defaultValue ? [defaultValue] : undefined}
              format={dateFormat}
              value={value}
              readOnly={readOnly}
              disabled={disabled}
              placeholder={_placeholder}
              allowClear={showClear}
              disabledDate={checkRange}
              // todo @aoao handleUpdateDsl?
              // onClear={() => }
              // onChange={(value) => {}}
            />
            <InvalidMessage
              customRule={_customValue}
              hideValidationMessage={hideValidationMessage}
            />
          </div>
        </LabelWrapper>
      </Wrapper>
    </TooltipWrapper>
  )
}

WrappedDateRange.displayName = "WrappedDateRange"

export const DateRangeWidget = withParser(WrappedDateRange)
