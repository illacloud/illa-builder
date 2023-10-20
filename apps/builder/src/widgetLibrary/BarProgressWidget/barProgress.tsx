import { FC, useEffect, useMemo } from "react"
import { Progress } from "@illa-design/react"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { applyCenterLabelAndComponentWrapperStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { BarProgressWidgetProps, WrappedBarProgressProps } from "./interface"

export const WrappedBarProgress: FC<WrappedBarProgressProps> = (props) => {
  const { value, showText, strokeWidth, color, trailColor } = props

  const _strokeWidth = useMemo(() => {
    return !isNaN(Number(strokeWidth)) ? strokeWidth + "px" : strokeWidth
  }, [strokeWidth])

  return (
    <Progress
      type="line"
      percent={value}
      showText={!showText}
      color={color}
      w="100%"
      trailColor={trailColor}
      strokeWidth={_strokeWidth}
    />
  )
}

WrappedBarProgress.displayName = "WrappedBarProgress"

export const BarProgressWidget: FC<BarProgressWidgetProps> = (props) => {
  const {
    displayName,
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
    updateComponentHeight,
  } = props

  useEffect(() => {
    updateComponentRuntimeProps({
      setValue: (value: string) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: undefined })
      },
    })

    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    deleteComponentRuntimeProps,
    displayName,
    handleUpdateDsl,
    updateComponentRuntimeProps,
  ])

  return (
    <AutoHeightContainer updateComponentHeight={updateComponentHeight}>
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <div css={applyCenterLabelAndComponentWrapperStyle(labelPosition)}>
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
          <WrappedBarProgress {...props} />
        </div>
      </TooltipWrapper>
    </AutoHeightContainer>
  )
}

BarProgressWidget.displayName = "BarProgressWidget"

export default BarProgressWidget
