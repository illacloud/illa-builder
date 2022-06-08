import { InputNumber, LoadingIcon } from "@illa-design/react"
import { FC, useEffect, useMemo, useState } from "react"
import { WrappedNumberInputProps } from "@/wrappedComponents/NumberInput/interface"
import { withParser } from "@/wrappedComponents/parserHOC"
import LabelWrapper from "@/wrappedComponents/LabelWrapper"

const parserThousand = (value: number | string) =>
  `${value}`.replace(/([-+]?\d{3})(?=\d)/g, "$1,")

export const WrappedInputNumber: FC<WrappedNumberInputProps> = (props) => {
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
    handleUpdateDsl,
    label,
    labelAlign,
    labelWidth,
    labelCaption,
    labelWidthUnit,
    labelPosition,
    required,
    tooltipText,
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
    <LabelWrapper
      label={label}
      labelAlign={labelAlign}
      labelWidth={labelWidth}
      labelCaption={labelCaption}
      labelWidthUnit={labelWidthUnit}
      labelPosition={labelPosition}
      required={required}
      tooltipText={tooltipText}
    >
      <InputNumber
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
      />
    </LabelWrapper>
  )
}

export const NumberInputWidget = withParser(WrappedInputNumber)
