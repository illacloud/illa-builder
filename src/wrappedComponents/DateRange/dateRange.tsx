import { forwardRef, useCallback, useMemo } from "react"
import dayjs from "dayjs"
import { DateRangePicker } from "@illa-design/date-picker"
import { Wrapper } from "@/wrappedComponents/Wrapper"
import { TooltipWrapper } from "@/wrappedComponents/TooltipWrapper"
import { InvalidMessage } from "@/wrappedComponents/InvalidMessage"
import { invalidMessage } from "@/wrappedComponents/InvalidMessage/utils"
import LabelWrapper from "@/wrappedComponents/LabelWrapper"
import { inputContainerCss } from "./style"
import { WrappedDateRangeProps } from "./interface"

export const WrappedDateRange = forwardRef<any, WrappedDateRangeProps>(
  (props, ref) => {
    const {
      startValue,
      endValue,
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
      colorScheme,
      minDate,
      disabled,
      maxDate,
      readOnly,
      customRule,
      hideValidationMessage,
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
          </LabelWrapper>
        </Wrapper>
      </TooltipWrapper>
    )
  },
)

WrappedDateRange.displayName = "WrappedDateRange"

export const DateRangeWidget = WrappedDateRange
