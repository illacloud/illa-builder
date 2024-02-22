import { Slider } from "antd-mobile"
import { debounce } from "lodash-es"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { AutoHeightContainer } from "@/widgetLibrary/PC/PublicSector/AutoHeightContainer"
import { InvalidMessage } from "@/widgetLibrary/PC/PublicSector/InvalidMessage/"
import { Label } from "@/widgetLibrary/PC/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PC/PublicSector/TooltipWrapper"
import { applyValidateMessageWrapperStyle } from "@/widgetLibrary/PC/PublicSector/TransformWidgetWrapper/style"
import { SliderWidgetProps } from "./interface"
import {
  applyLabelAndComponentWrapperStyle,
  sliderContainerStyle,
} from "./style"
import { getValidateMessageFunc } from "./utils"

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
    defaultValue,
    updateComponentHeight,
    triggerEventHandler,
  } = props

  const [sliderValue, setSliderValue] = useState<number | undefined>(
    defaultValue as number,
  )

  useEffect(() => {
    setSliderValue(defaultValue)

    handleUpdateMultiExecutionResult([
      {
        displayName,
        value: {
          value: defaultValue || "",
        },
      },
    ])
  }, [defaultValue, displayName, handleUpdateMultiExecutionResult])

  const handleValidate = useCallback(
    (value: number | number[] | undefined) => {
      const message = getValidateMessageFunc(value, {
        hideValidationMessage: hideValidationMessage,
        required: required,
        customRule: customRule,
      })
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
    [
      customRule,
      displayName,
      handleUpdateMultiExecutionResult,
      hideValidationMessage,
      required,
    ],
  )

  const debounceOnChange = useRef(
    debounce(
      (
        value: number | undefined,
        triggerEventHandler: SliderWidgetProps["triggerEventHandler"],
        options?: {
          hideValidationMessage?: SliderWidgetProps["hideValidationMessage"]
          pattern?: SliderWidgetProps["pattern"]
          regex?: SliderWidgetProps["regex"]
          required?: SliderWidgetProps["required"]
          customRule?: SliderWidgetProps["customRule"]
        },
      ) => {
        new Promise((resolve) => {
          const message = getValidateMessageFunc(value, options)
          handleUpdateMultiExecutionResult([
            {
              displayName,
              value: {
                value: value || "",
                validateMessage: message,
              },
            },
          ])
          resolve(true)
        }).then(() => {
          triggerEventHandler("change")
        })
      },
      180,
    ),
  )

  const handleOnChange = useCallback(
    (value: number | number[]) => {
      setSliderValue(value as number)
      debounceOnChange.current(value as number, triggerEventHandler, {
        hideValidationMessage: hideValidationMessage,

        required: required,
        customRule: customRule,
      })
    },
    [customRule, hideValidationMessage, required, triggerEventHandler],
  )

  useEffect(() => {
    updateComponentRuntimeProps({
      setValue: (value: number) => {
        if (typeof value === "number") {
          handleOnChange(value)
        }
      },
      clearValue: () => {
        handleOnChange(min ?? 0)
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
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    defaultValue,
    deleteComponentRuntimeProps,
    displayName,
    handleOnChange,
    handleUpdateMultiExecutionResult,
    handleValidate,
    min,
    updateComponentRuntimeProps,
    value,
  ])

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
          <div css={sliderContainerStyle}>
            <Slider {...props} onChange={handleOnChange} value={sliderValue} />
          </div>
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
