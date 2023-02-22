import { FC, useCallback, useEffect, useRef } from "react"
import { Rate } from "@illa-design/react"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { applyLabelAndComponentWrapperStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { RateWidgetProps, WrappedRateProps } from "./interface"

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
    handleOnChange,
  } = props

  return (
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
        handleOnChange?.()
      }}
    />
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
    updateComponentHeight,
    triggerEventHandler,
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
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])

  const handleOnChange = useCallback(() => {
    triggerEventHandler("change")
  }, [triggerEventHandler])

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
          <WrappedRate {...props} handleOnChange={handleOnChange} />
        </div>
      </TooltipWrapper>
    </AutoHeightContainer>
  )
}
RateWidget.displayName = "RateWidget"
