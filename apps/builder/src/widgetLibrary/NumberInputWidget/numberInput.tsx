import { FC, forwardRef, useEffect, useMemo, useRef, useState } from "react"
import { InputNumber } from "@illa-design/input-number"
import { LoadingIcon } from "@illa-design/icon"
import {
  NumberInputWidgetProps,
  WrappedNumberInputProps,
} from "@/widgetLibrary/NumberInputWidget/interface"
import { applyLabelAndComponentWrapperStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"

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
    handleUpdateDsl,
  } = props

  const [finalValue, setFinalValue] = useState(value)

  const changeValue = (value: number | undefined) => {
    setFinalValue(value)
    handleUpdateDsl({ value })
  }

  const formatDisplayValue = useMemo(() => {
    return openThousandSeparator ? parserThousand : undefined
  }, [openThousandSeparator])

  useEffect(() => {
    if (finalValue !== value) {
      setFinalValue(value)
    }
  }, [finalValue, value])

  const finalSuffix = useMemo(() => {
    if (loading) {
      return <LoadingIcon spin />
    }
    return suffix
  }, [loading, suffix])

  return (
    <InputNumber
      inputRef={ref}
      max={max}
      min={min}
      formatter={formatDisplayValue}
      placeholder={placeholder}
      value={finalValue}
      precision={Number(precision)}
      disabled={disabled}
      readOnly={readOnly}
      prefix={prefix}
      suffix={finalSuffix}
      mode="button"
      onChange={changeValue}
      borderColor={colorScheme}
    />
  )
})
WrappedInputNumber.displayName = "WrappedInputNumber"
export const NumberInputWidget: FC<NumberInputWidgetProps> = (props) => {
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
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
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
    pattern,
    regex,
    customRule,
    hideValidationMessage,
    updateComponentHeight,
  } = props
  const numberInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
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
      focus: () => {
        numberInputRef.current?.focus()
      },
      setValue: (value: number) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: 0 })
      },
      validate: () => {},
      clearValidation: () => {},
    })

    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
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
    displayName,
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
    value,
    pattern,
    regex,
    required,
    customRule,
    hideValidationMessage,
    labelPosition,
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
          <WrappedInputNumber {...props} ref={numberInputRef} />
        </div>
      </TooltipWrapper>
      <InvalidMessage
        value={value}
        pattern={pattern}
        regex={regex}
        required={required}
        customRule={customRule}
        hideValidationMessage={hideValidationMessage}
      />
    </div>
  )
}
NumberInputWidget.displayName = "NumberInputWidget"
