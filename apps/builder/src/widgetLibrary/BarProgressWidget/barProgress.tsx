import { FC, forwardRef, useEffect, useMemo, useRef } from "react"
import { Progress } from "@illa-design/react"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { applyCenterLabelAndComponentWrapperStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { BarProgressWidgetProps, WrappedBarProgressProps } from "./interface"

export const WrappedBarProgress = forwardRef<any, WrappedBarProgressProps>(
  (props, ref) => {
    const { value, showText, strokeWidth, color, trailColor } = props

    const _strokeWidth = useMemo(() => {
      return !isNaN(Number(strokeWidth)) ? strokeWidth + "px" : strokeWidth
    }, [strokeWidth])

    return (
      <Progress
        type="line"
        percent={value}
        showText={showText}
        color={color}
        w="100%"
        trailColor={trailColor}
        strokeWidth={_strokeWidth}
      />
    )
  },
)

WrappedBarProgress.displayName = "WrappedBarProgress"

export const BarProgressWidget: FC<BarProgressWidgetProps> = (props) => {
  const {
    value,
    showText,
    strokeWidth,
    color,
    trailColor,
    displayName,
    handleUpdateDsl,
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
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      value,
      showText,
      strokeWidth,
      color,
      trailColor,
      setValue: (value: string) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: undefined })
      },
    })

    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    value,
    showText,
    strokeWidth,
    color,
    trailColor,
    displayName,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
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
