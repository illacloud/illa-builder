import { FC, useCallback, useEffect, useRef } from "react"
import dayjs from "dayjs"
import { DatePicker } from "@illa-design/date-picker"
import { DateWidgetProps, WrappedDateProps } from "./interface"
import {
  applyLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
} from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

export const WrappedDate: FC<WrappedDateProps> = (props) => {
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
    <DatePicker
      w="100%"
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
      onChange={(value) => {
        handleUpdateDsl({ value })
      }}
    />
  )
}

WrappedDate.displayName = "WrappedDate"

export const DateWidget: FC<DateWidgetProps> = (props) => {
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
    pattern,
    regex,
    customRule,
    hideValidationMessage,
    updateComponentHeight,
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
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef.current) {
      updateComponentHeight(wrapperRef.current?.clientHeight)
    }
  }, [
    required,
    labelPosition,
    value,
    pattern,
    regex,
    customRule,
    hideValidationMessage,
  ])

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
          <WrappedDate {...props} />
        </div>
      </TooltipWrapper>
      <div
        css={applyValidateMessageWrapperStyle(
          labelWidth,
          labelPosition,
          labelHidden || !label,
        )}
      >
        <InvalidMessage
          value={value}
          pattern={pattern}
          regex={regex}
          required={required}
          customRule={customRule}
          hideValidationMessage={hideValidationMessage}
        />
      </div>
    </div>
  )
}
DateWidget.displayName = "DateWidget"
