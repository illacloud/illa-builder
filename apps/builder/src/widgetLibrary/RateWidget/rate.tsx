import { FC, useCallback, useEffect, useRef } from "react"
import { Rate } from "@illa-design/react"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  applyLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
} from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { InvalidMessage } from "../PublicSector/InvalidMessage"
import { handleValidateCheck } from "../PublicSector/InvalidMessage/utils"
import { RateWidgetProps, WrappedRateProps } from "./interface"
import { rateStyle } from "./style"

export const WrappedRate: FC<WrappedRateProps> = (props) => {
  const {
    value,
    allowClear,
    disabled,
    icon,
    readonly,
    allowHalf,
    maxCount,
    handleOnChange,
  } = props

  return (
    <Rate
      css={rateStyle}
      count={maxCount}
      allowHalf={allowHalf}
      heart={icon === "heart"}
      disabled={disabled}
      readonly={readonly}
      allowClear={allowClear}
      value={value}
      onChange={handleOnChange}
    />
  )
}

WrappedRate.displayName = "WrappedRate"

export const RateWidget: FC<RateWidgetProps> = (props) => {
  const {
    handleUpdateDsl,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
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
    hideValidationMessage,
    validateMessage,
    customRule,
    value,
    updateComponentHeight,
    triggerEventHandler,
  } = props

  const triggerRef = useRef<HTMLDivElement>(null)
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
    updateComponentRuntimeProps({
      setValue: (value: number) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: 0 })
      },
      validate: () => {
        return handleValidate(value)
      },
      clearValidation: () => {
        handleUpdateDsl({
          validateMessage: "",
        })
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    updateComponentRuntimeProps,
    handleUpdateDsl,
    deleteComponentRuntimeProps,
    handleValidate,
    value,
  ])

  const handleOnChange = useCallback(
    (value?: string) => {
      new Promise((resolve) => {
        const validateMessage = getValidateMessage(value)
        handleUpdateDsl({ value, validateMessage })
        resolve(true)
      }).then(() => {
        triggerEventHandler("change")
      })
    },
    [getValidateMessage, handleUpdateDsl, triggerEventHandler],
  )

  return (
    <AutoHeightContainer updateComponentHeight={updateComponentHeight}>
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <div
          css={applyLabelAndComponentWrapperStyle(labelPosition)}
          ref={triggerRef}
        >
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
          <WrappedRate {...props} handleOnChange={handleOnChange} />
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
RateWidget.displayName = "RateWidget"
export default RateWidget
