import { FC, forwardRef, useCallback, useEffect } from "react"
import dayjs from "dayjs"
import { DatePicker } from "@illa-design/date-picker"
import { DateTimeWidgetProps, WrappedDateTimeProps } from "./interface"
import { applyLabelAndComponentWrapperStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"

export const WrappedDateTime = forwardRef<any, WrappedDateTimeProps>(
  (props, ref) => {
    const {
      value,
      format,
      placeholder,
      showClear,
      minDate,
      disabled,
      maxDate,
      readOnly,
      minuteStep,
      colorScheme,
      handleUpdateDsl,
    } = props

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
      <DatePicker
        w="100%"
        showTime={{ step: { minute: minuteStep }, format }}
        colorScheme={colorScheme}
        format={format}
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
  },
)

WrappedDateTime.displayName = "WrappedDateTime"

export const DateTimeWidget: FC<DateTimeWidgetProps> = (props) => {
  const {
    value,
    format,
    placeholder,
    showClear,
    minDate,
    disabled,
    maxDate,
    readOnly,
    minuteStep,
    colorScheme,
    displayName,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
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
    pattern,
    regex,
    customRule,
    hideValidationMessage,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      value,
      format,
      placeholder,
      showClear,
      minDate,
      disabled,
      maxDate,
      readOnly,
      minuteStep,
      colorScheme,
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
    format,
    placeholder,
    showClear,
    minDate,
    disabled,
    maxDate,
    readOnly,
    minuteStep,
    colorScheme,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])
  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <span>
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
          <WrappedDateTime {...props} />
        </div>
        <InvalidMessage
          value={value}
          pattern={pattern}
          regex={regex}
          required={required}
          customRule={customRule}
          hideValidationMessage={hideValidationMessage}
        />
      </span>
    </TooltipWrapper>
  )
}

DateTimeWidget.displayName = "DateTimeWidget"
