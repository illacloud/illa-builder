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
      handleUpdateDsl,
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
      <div css={applyWrapperSlider} style={{}}>
        {currentPrefixIcon && (
          <span css={applyIcon}>
            {currentPrefixIcon && currentPrefixIcon({})}
          </span>
        )}
        <Slider
          hideValue={hideOutput}
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

export const SliderWidget: FC<SliderWidgetProps> = (props, ref) => {
  const {
    value,
    min,
    disabled,
    colorScheme,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
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
      handleUpdateDsl({
        validateMessage: message,
      })
      return message
    },
    [getValidateMessage, handleUpdateDsl],
  )

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      value,
      setValue: (value: number) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: min, validateMessage: "" })
      },
      validate: () => {
        return handleValidate(value)
      },
      clearValidation: () => {
        handleUpdateDsl({
          validateMessage: "",
        })
      },
      reset: () => {
        handleUpdateDsl({ value: defaultValue, validateMessage: "" })
      },
      focus: () => {
        sliderRef.current?.focus()
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    value,
    disabled,
    colorScheme,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
    handleValidate,
    min,
    defaultValue,
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
      {hideValidationMessage && (
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
