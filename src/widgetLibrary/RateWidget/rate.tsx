import { FC, useEffect, useMemo } from "react"
import { Rate } from "@illa-design/rate"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { invalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"
import { WrappedRateProps } from "./interface"
import { inputContainerCss } from "./style"

export const WrappedRate: FC<WrappedRateProps> = (props, ref) => {
  const {
    value,
    allowClear,
    required,
    disabled,
    customRule,
    icon,
    readOnly,
    allowHalf,
    hideValidationMessage,
    maxCount,
    handleUpdateDsl,
    displayName,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  } = props

  const _customValue = useMemo(() => {
    if (customRule) {
      return customRule
    } else if (required && !value) {
      return invalidMessage.get("required")
    }
  }, [customRule, required, value])

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      value,
      allowClear,
      required,
      disabled,
      customRule,
      icon,
      readOnly,
      allowHalf,
      hideValidationMessage,
      maxCount,
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
    displayName,
    value,
    allowClear,
    required,
    disabled,
    customRule,
    icon,
    readOnly,
    allowHalf,
    hideValidationMessage,
    maxCount,
  ])

  return (
    <div css={inputContainerCss}>
      <Rate
        count={maxCount}
        allowHalf={allowHalf}
        heart={icon === "heart"}
        disabled={disabled}
        readonly={readOnly}
        allowClear={allowClear}
        value={value}
        onChange={(value) => {
          handleUpdateDsl({ value })
        }}
      />
      <InvalidMessage
        customRule={_customValue}
        hideValidationMessage={hideValidationMessage}
      />
    </div>
  )
}

WrappedRate.displayName = "WrappedRate"

export const RateWidget = WrappedRate
