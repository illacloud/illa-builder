import { FC, forwardRef, useCallback, useEffect, useRef, useState } from "react"
import { Slider } from "@illa-design/react"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage/"
import { handleValidateCheck } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { applyValidateMessageWrapperStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { AllData } from "../IconWidget/utils"
import { RangeSliderWidgetProps, WrappedRangeSliderProps } from "./interface"
import {
  applyIcon,
  applyLabelAndComponentWrapperStyle,
  applyWrapperSlider,
} from "./style"

export const WrappedRangeSlider = forwardRef<
  HTMLDivElement,
  WrappedRangeSliderProps
>((props) => {
  const {
    startValue,
    endValue,
    prefixIcon,
    suffixIcon,
    hideOutput,
    min,
    max,
    step = 1,
    handleOnChange,
    getValidateMessage,
    handleUpdateMultiExecutionResult,
    displayName,
  } = props

  const onChangeSliderValue = useCallback(
    (value: number | number[]) => {
      new Promise((resolve) => {
        const message = getValidateMessage(value)
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              startValue: (value as number[])[0] ?? min ?? 0,
              endValue: (value as number[])[1] ?? max ?? 10,
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
      max,
      min,
    ],
  )
  const getIcon = (iconName: string) => (iconName && AllData[iconName]) || null
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
        value={[startValue, endValue]}
        showTicks={!hideOutput}
        onChange={onChangeSliderValue}
        isRange={true}
        {...props}
      />
      {currentSuffixIcon && (
        <span css={applyIcon}>
          {currentSuffixIcon && currentSuffixIcon({})}
        </span>
      )}
    </div>
  )
})

WrappedRangeSlider.displayName = "WrappedRangeSlider"

export const RangeSliderWidget: FC<RangeSliderWidgetProps> = (props) => {
  const {
    startValue,
    endValue,
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
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const defaultStartValue = useRef<number>(startValue)
  const defaultEndValue = useRef<number>(endValue)

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
      setStartOfRange: (startValue: number) => {
        handleUpdateDsl({ startValue })
      },
      setEndOfRange: (endValue: number) => {
        handleUpdateDsl({ endValue })
      },
      validate: () => {
        return handleValidate({ startValue, endValue })
      },
      clearValidation: () => {
        handleUpdateDsl({
          validateMessage: "",
        })
      },
      reset: () => {
        handleUpdateDsl({
          startValue: defaultStartValue,
          endValue: defaultStartValue,
          validateMessage: "",
        })
      },
      focus: () => setIsFocus(true),
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    startValue,
    endValue,
    disabled,
    colorScheme,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
    handleValidate,
    min,
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
          <WrappedRangeSlider
            {...props}
            startValue={startValue}
            endValue={endValue}
            ref={sliderRef}
            isFocus={isFocus}
            getValidateMessage={getValidateMessage}
            handleOnChange={handleOnChange}
          />
        </div>
      </TooltipWrapper>
      <div
        css={applyValidateMessageWrapperStyle(
          labelWidth,
          labelPosition,
          labelHidden || !label,
        )}
      >
        <InvalidMessage validateMessage={validateMessage} />
      </div>
    </AutoHeightContainer>
  )
}
RangeSliderWidget.displayName = "RangeSliderWidget"
