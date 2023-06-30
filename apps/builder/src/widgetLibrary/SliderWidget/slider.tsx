import { FC, forwardRef, useCallback, useEffect, useRef, useState } from "react"
import { Slider } from "@illa-design/react"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage/"
import { handleValidateCheck } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { applyValidateMessageWrapperStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { AllData } from "../IconWidget/utils"
import { SliderWidgetProps, WrappedSliderProps } from "./interface"
import {
  applyIcon,
  applyLabelAndComponentWrapperStyle,
  applyWrapperSlider,
} from "./style"

export const WrappedSlider = forwardRef<HTMLDivElement, WrappedSliderProps>(
  (props, ref) => {
    const {
      prefixIcon,
      suffixIcon,
      hideOutput,
      handleOnChange,
      getValidateMessage,
      handleUpdateMultiExecutionResult,
      displayName,
    } = props
    const onChangeSliderValue = useCallback(
      (value: unknown) => {
        new Promise((resolve) => {
          const message = getValidateMessage(value)
          handleUpdateMultiExecutionResult([
            {
              displayName,
              value: {
                value: value ?? 0,
                validateMessage: message,
              },
            },
          ])
          resolve(true)
        }).then(() => {
          handleOnChange?.()
        })
      },
      [
        displayName,
        getValidateMessage,
        handleOnChange,
        handleUpdateMultiExecutionResult,
      ],
    )

    const getIcon = (iconName: string) =>
      (iconName && AllData[iconName]) || null
    const currentPrefixIcon = getIcon(prefixIcon ?? "")
    const currentSuffixIcon = getIcon(suffixIcon ?? "")
    return (
      <div css={applyWrapperSlider}>
        {currentPrefixIcon && (
          <span css={applyIcon}>
            {currentPrefixIcon && currentPrefixIcon({})}
          </span>
        )}
        <Slider
          tooltipVisible={!hideOutput}
          onChange={onChangeSliderValue}
          isRange={false}
          ref={ref}
          {...props}
        />
        {currentSuffixIcon && (
          <span css={applyIcon}>
            {currentSuffixIcon && currentSuffixIcon({})}
          </span>
        )}
      </div>
    )
  },
)

WrappedSlider.displayName = "WrappedSlider"

export const SliderWidget: FC<SliderWidgetProps> = (props) => {
  const {
    value,
    min,
    displayName,
    handleUpdateMultiExecutionResult,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    labelPosition,
    labelFull,
    labelWrapping,
    label,
    labelAlign,
    labelWidth = 33,
    labelCaption,
    labelWidthUnit,
    required,
    labelHidden,
    tooltipText,
    customRule,
    hideValidationMessage,
    validateMessage,
    updateComponentHeight,
    triggerEventHandler,
  } = props

  const sliderRef = useRef<HTMLDivElement>(null)
  const [defaultValue] = useState<number>(value as number)

  const getValidateMessage = useCallback(
    (value: unknown) => {
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
    (value: unknown) => {
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
      setValue: (value: number) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { value },
          },
        ])
      },
      clearValue: () => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { value: min, validateMessage: "" },
          },
        ])
      },
      validate: () => {
        return handleValidate(value)
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
      reset: () => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { value: defaultValue, validateMessage: "" },
          },
        ])
      },
      focus: () => {
        sliderRef.current?.focus()
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    defaultValue,
    deleteComponentRuntimeProps,
    displayName,
    handleUpdateMultiExecutionResult,
    handleValidate,
    min,
    updateComponentRuntimeProps,
    value,
  ])

  const handleOnChange = useCallback(() => {
    triggerEventHandler("change")
  }, [triggerEventHandler])
  return (
    <AutoHeightContainer updateComponentHeight={updateComponentHeight}>
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <div
          css={applyLabelAndComponentWrapperStyle(
            labelWrapping ? "top" : labelPosition,
          )}
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
          <WrappedSlider
            {...props}
            value={value}
            ref={sliderRef}
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
SliderWidget.displayName = "SliderWidget"
export default SliderWidget
