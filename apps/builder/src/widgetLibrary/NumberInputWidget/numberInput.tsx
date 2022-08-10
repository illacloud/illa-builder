import { FC, forwardRef, useEffect, useMemo, useRef, useState } from "react"
import { InputNumber } from "@illa-design/input-number"
import { LoadingIcon } from "@illa-design/icon"
import {
  NumberInputWidgetProps,
  WrappedNumberInputProps,
} from "@/widgetLibrary/NumberInputWidget/interface"
import { autoWidthContainerStyle } from "@/widgetLibrary/PublicSector/containerStyle"

const parserThousand = (value: number | string) =>
  `${value}`.replace(/([-+]?\d{3})(?=\d)/g, "$1,")

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
  ])

  return (
    <div css={autoWidthContainerStyle}>
      <WrappedInputNumber {...props} ref={numberInputRef} />
    </div>
  )
}
NumberInputWidget.displayName = "NumberInputWidget"
