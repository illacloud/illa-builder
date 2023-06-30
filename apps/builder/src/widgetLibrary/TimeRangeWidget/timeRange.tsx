import { FC, useCallback, useEffect, useMemo } from "react"
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

  const clearValue = () => {
    const startMessage = getValidateMessage(undefined)
    const endMessage = getValidateMessage(undefined)
    handleUpdateMultiExecutionResult([
      {
        displayName,
        value: {
          value: ["", ""],
          startTime: "",
          endTime: "",
          validateMessage: startMessage || endMessage,
        },
      },
    ])
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
      onClear={clearValue}
      onChange={changeValue}
    />
  )
}

WrappedTimeRange.displayName = "WrappedTimeRange"

export const TimeRangeWidget: FC<TimeRangeWidgetProps> = (props) => {
  const {
    startTime,
    endTime,
    startPlaceholder,
    endPlaceholder,
    showClear,
    disabled,
    colorScheme,
    displayName,
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
    validateMessage,
    customRule,
    hideValidationMessage,
    updateComponentHeight,
    triggerEventHandler,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    handleUpdateMultiExecutionResult,
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
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: {
            validateMessage: message,
          },
        },
      ])
      return message
    },
    [displayName, getValidateMessage, handleUpdateMultiExecutionResult],
  )

  useEffect(() => {
    updateComponentRuntimeProps({
      setStartTime: (startTime: string) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: [startTime, endTime],
              startTime,
            },
          },
        ])
      },
      setEndTime: (endTime: string) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: [startTime, endTime],
              endTime,
            },
          },
        ])
      },
      clearValue: () => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: ["", ""],
              startTime: "",
              endTime: "",
            },
          },
        ])
      },
      validate: () => {
        if (!startTime || !endTime) {
          return handleValidate(undefined)
        }
        const startValueChecked = handleValidate(startTime)
        if (startValueChecked) {
          return startValueChecked
        }
        const endValueChecked = handleValidate(endTime)
        if (endValueChecked) {
          return endValueChecked
        }
      },
      clearValidation: () => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              validateMessage: "",
            },
          },
        ])
      },
    })
    return () => {
      deleteComponentRuntimeProps()
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
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    handleValidate,
    handleUpdateMultiExecutionResult,
  ])

  useEffect(() => {
    handleUpdateMultiExecutionResult([
      {
        displayName,
        value: {
          value: [startTime, endTime],
        },
      },
    ])
  }, [startTime, endTime, handleUpdateMultiExecutionResult, displayName])

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
export default TimeRangeWidget
