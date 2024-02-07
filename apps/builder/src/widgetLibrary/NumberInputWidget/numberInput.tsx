import { debounce } from "lodash-es"
import { FC, forwardRef, useCallback, useEffect, useRef, useState } from "react"
import { InputNumber, LoadingIcon } from "@illa-design/react"
import {
  NumberInputWidgetProps,
  WrappedNumberInputProps,
} from "@/widgetLibrary/NumberInputWidget/interface"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  applyLabelAndComponentWrapperStyle,
  applyValidateMessageWrapperStyle,
} from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { getValidateMessageFunc } from "./utils"

const parserThousand = (value: number | string) =>
  `${value}`.replace(/\d+/, function (s) {
    return s.replace(/(\d)(?=(\d{3})+$)/g, "$1,")
  })

export const WrappedInputNumber = forwardRef<
  HTMLInputElement,
  WrappedNumberInputProps
>((props, ref) => {
  const {
    openThousandSeparator,
    max,
    min,
    placeholder,
    value,
    precision,
    disabled,
    readOnly,
    prefix,
    suffix,
    loading,
    colorScheme,
    handleOnChange,
    handleOnBlur,
    handleOnFocus,
  } = props

  return (
    <InputNumber
      inputRef={ref}
      max={max}
      min={min}
      formatter={openThousandSeparator ? parserThousand : undefined}
      placeholder={placeholder}
      value={value}
      precision={precision}
      disabled={disabled}
      readOnly={readOnly}
      prefix={prefix}
      suffix={loading ? <LoadingIcon spin /> : suffix}
      mode="button"
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      colorScheme={colorScheme}
    />
  )
})
WrappedInputNumber.displayName = "WrappedInputNumber"
export const NumberInputWidget: FC<NumberInputWidgetProps> = (props) => {
  const {
    displayName,
    value,
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
    pattern,
    regex,
    customRule,
    hideValidationMessage,
    updateComponentHeight,
    validateMessage,
    defaultValue,
    triggerEventHandler,
    handleUpdateMultiExecutionResult,
  } = props
  const numberInputRef = useRef<HTMLInputElement>(null)
  const [numberInputValue, setNumberInputValue] = useState(
    value || defaultValue,
  )

  useEffect(() => {
    setNumberInputValue(defaultValue)
    const message = getValidateMessageFunc(defaultValue, {
      hideValidationMessage: hideValidationMessage,
      pattern: pattern,
      regex: regex,

      required: required,
      customRule: customRule,
    })
    handleUpdateMultiExecutionResult([
      {
        displayName,
        value: {
          value: defaultValue || "",
          validateMessage: message,
        },
      },
    ])
  }, [
    customRule,
    defaultValue,
    displayName,
    handleUpdateMultiExecutionResult,
    hideValidationMessage,
    pattern,
    regex,
    required,
  ])

  const handleValidate = useCallback(
    (value?: unknown) => {
      const message = getValidateMessageFunc(value, {
        hideValidationMessage: hideValidationMessage,
        pattern: pattern,
        regex: regex,
        required: required,
        customRule: customRule,
      })
      handleUpdateDsl({
        validateMessage: message,
      })
      return message
    },
    [
      customRule,
      handleUpdateDsl,
      hideValidationMessage,
      pattern,
      regex,
      required,
    ],
  )

  useEffect(() => {
    updateComponentRuntimeProps({
      focus: () => {
        numberInputRef.current?.focus()
      },
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

  const debounceOnChange = useRef(
    debounce(
      (
        value?: number | undefined,
        options?: {
          hideValidationMessage?: NumberInputWidgetProps["hideValidationMessage"]
          pattern?: NumberInputWidgetProps["pattern"]
          regex?: NumberInputWidgetProps["regex"]
          required?: NumberInputWidgetProps["required"]
          customRule?: NumberInputWidgetProps["customRule"]
        },
      ) => {
        new Promise((resolve) => {
          const message = getValidateMessageFunc(value, options)
          handleUpdateMultiExecutionResult([
            {
              displayName,
              value: {
                value: value === undefined ? "" : value,
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

  const handleOnChange = (value?: number | undefined) => {
    setNumberInputValue(value)
    debounceOnChange.current(value, {
      hideValidationMessage,
      pattern,
      regex,
      required,
      customRule,
    })
  }
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
          <WrappedInputNumber
            {...props}
            value={numberInputValue}
            ref={numberInputRef}
            handleOnChange={handleOnChange}
            handleOnBlur={() => {
              triggerEventHandler("blur")
            }}
            handleOnFocus={() => {
              triggerEventHandler("focus")
            }}
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
NumberInputWidget.displayName = "NumberInputWidget"
export default NumberInputWidget
