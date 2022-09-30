import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import dayjs from "dayjs"
import { DateRangePicker } from "@illa-design/date-picker"
import { DateWidgetProps, WrappedDateRangeProps } from "./interface"
import { applyLabelAndComponentWrapperStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

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
    return !startValue && !endValue ? undefined : [startValue, endValue]
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
    <DateRangePicker
      w="100%"
      colorScheme={colorScheme}
      format={dateFormat}
      value={dateRangeValue}
      readOnly={readOnly}
      disabled={disabled}
      placeholder={_placeholder}
      allowClear={showClear}
      disabledDate={checkRange}
      onClear={() => {
        handleUpdateDsl({
          startValue: undefined,
          endValue: undefined,
        })
      }}
      onChange={(value) => {
        handleUpdateDsl({
          startValue: value?.[0],
          endValue: value?.[1],
        })
      }}
    />
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
    labelPosition,
    labelFull,
    label,
    labelAlign,
    labelWidth = 33,
    labelCaption,
    labelWidthUnit,
    required,
    labelHidden,
    tooltipText,
    updateComponentHeight,
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
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef.current) {
      updateComponentHeight(wrapperRef.current?.clientHeight)
    }
  }, [required, labelPosition, updateComponentHeight])
  return (
    <div ref={wrapperRef}>
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <div css={applyLabelAndComponentWrapperStyle(labelPosition)}>
          <Label
            labelFull={labelFull}
            label={label}
            labelAlign={labelAlign}
            labelWidth={labelWidth}
            labelCaption={labelCaption}
            labelWidthUnit={labelWidthUnit}
            labelPosition={labelPosition}
            required={required}
            labelHidden={labelHidden}
            hasTooltip={!!tooltipText}
          />
          <WrappedDateRange {...props} />
        </div>
      </TooltipWrapper>
    </div>
  )
}
DateRangeWidget.displayName = "DateRangeWidget"
