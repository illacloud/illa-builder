import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import { RangePicker } from "@illa-design/react"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  applyLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
} from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { handleValidateCheck } from "../PublicSector/InvalidMessage/utils"
import { TimeRangeWidgetProps, WrappedTimeRangeProps } from "./interface"

export const WrappedTimeRange: FC<WrappedTimeRangeProps> = (props) => {
  const {
    startTime,
    endTime,
    format,
    startPlaceholder,
    endPlaceholder,
    minuteStep,
    showClear,
    disabled,
    colorScheme,
    handleOnChange,
    getValidateMessage,
    handleUpdateMultiExecutionResult,
    displayName,
  } = props

  const changeValue = (value?: string[]) => {
    console.log("value", value, typeof value, typeof (value as string[])[0])
    new Promise((resolve) => {
      const startMessage = getValidateMessage(value?.[0])
      const endMessage = getValidateMessage(value?.[1])
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: {
            value: [value?.[0] || "", value?.[1] || ""],
            startTime: value?.[0] || "",
            endTime: value?.[1] || "",
            validateMessage: startMessage || endMessage,
          },
        },
      ])
      resolve(true)
    }).then(() => {
      handleOnChange?.()
    })
  }

  const _placeholder = [startPlaceholder ?? "", endPlaceholder ?? ""]

  const timeRangeValue = useMemo(() => {
    return !startTime && !endTime ? ["", ""] : [startTime, endTime]
  }, [startTime, endTime])

  return (
    <RangePicker
      w="100%"
      colorScheme={colorScheme}
      format={format}
      value={timeRangeValue}
      disabled={disabled}
      placeholder={_placeholder}
      allowClear={showClear}
      step={{ minute: minuteStep }}
      onClear={() => {
        changeValue(["", ""])
      }}
      onChange={changeValue}
    />
  )
}

WrappedTimeRange.displayName = "WrappedTimeRange"

export const TimeRangeWidget: FC<TimeRangeWidgetProps> = (props) => {
  const {
    startTime,
    endTime,
    format,
    startPlaceholder,
    endPlaceholder,
    showClear,
    disabled,
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
    validateMessage,
    customRule,
    hideValidationMessage,
    triggerEventHandler,
  } = props

  const getValidateMessage = useCallback(
    (value?: unknown) => {
      if (!hideValidationMessage) {
        const message = handleValidateCheck({
          value,
          required,
          customRule,
        })
        const showMessage = message && message.length > 0
        return showMessage ? message : ""
      }
      return ""
    },
    [customRule, hideValidationMessage, required],
  )

  const handleValidate = useCallback(
    (value?: unknown) => {
      const message = getValidateMessage(value)
      handleUpdateDsl({
        validateMessage: message,
      })
      return message
    },
    [getValidateMessage, handleUpdateDsl],
  )

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      setStartTime: (startTime: string) => {
        handleUpdateDsl({
          value: [startTime, endTime],
          startTime,
        })
      },
      setEndTime: (endTime: string) => {
        handleUpdateDsl({
          value: [startTime, endTime],
          endTime,
        })
      },
      clearValue: () => {
        handleUpdateDsl({
          value: ["", ""],
          startTime: "",
          endTime: "",
        })
      },
      validate: () => handleValidate([startTime, endTime]),
      clearValidation: () => {
        handleUpdateDsl({
          validateMessage: "",
        })
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    startTime,
    endTime,
    startPlaceholder,
    endPlaceholder,
    showClear,
    disabled,
    colorScheme,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
    handleValidate,
  ])

  useEffect(() => {
    handleUpdateDsl({ value: [startTime, endTime] })
  }, [startTime, endTime, handleUpdateDsl])

  const handleOnChange = useCallback(() => {
    triggerEventHandler("change")
  }, [triggerEventHandler])

  return (
    <AutoHeightContainer updateComponentHeight={updateComponentHeight}>
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
          <WrappedTimeRange
            {...props}
            getValidateMessage={getValidateMessage}
            handleOnChange={handleOnChange}
          />
        </div>
      </TooltipWrapper>
      {!hideValidationMessage && (
        <div
          css={applyValidateMessageWrapperStyle(
            labelWidth,
            labelPosition,
            labelHidden || !label,
          )}
        >
          <InvalidMessage validateMessage={validateMessage} />
        </div>
      )}
    </AutoHeightContainer>
  )
}
TimeRangeWidget.displayName = "TimeRangeWidget"
