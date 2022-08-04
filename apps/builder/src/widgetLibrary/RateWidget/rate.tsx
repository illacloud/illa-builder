import { FC, useEffect, useMemo } from "react"
import { Rate } from "@illa-design/rate"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { invalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"
import { RateWidgetProps, WrappedRateProps } from "./interface"
import { inputContainerCss } from "./style"

export const WrappedRate: FC<WrappedRateProps> = (props, ref) => {
  const {
    value,
    allowClear,
    disabled,
    icon,
    readOnly,
    allowHalf,
    maxCount,
    handleUpdateDsl,
  } = props

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
    </div>
  )
}

WrappedRate.displayName = "WrappedRate"

export const RateWidget: FC<RateWidgetProps> = (props) => {
  const {
    value,
    allowClear,
    disabled,
    icon,
    readOnly,
    allowHalf,
    maxCount,
    handleUpdateDsl,
    displayName,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      value,
      allowClear,
      disabled,
      icon,
      readOnly,
      allowHalf,
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
    disabled,
    icon,
    readOnly,
    allowHalf,
    maxCount,
  ])
  return <WrappedRate {...props} />
}
RateWidget.displayName = "RateWidget"
