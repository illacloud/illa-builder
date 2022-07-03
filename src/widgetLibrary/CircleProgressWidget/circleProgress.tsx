import { forwardRef, useMemo } from "react"
import { Progress } from "@illa-design/progress"
import { Wrapper } from "@/widgetLibrary/PublicSector/Wrapper"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import LabelWrapper from "@/widgetLibrary/PublicSector/LabelWrapper"
import { WrappedCircleProgressProps } from "./interface"

export const WrappedCircleProgress = forwardRef<
  any,
  WrappedCircleProgressProps
>((props, ref) => {
  const {
    value,
    tooltipText,
    label,
    labelAlign,
    labelWidth,
    labelPosition,
    labelCaption,
    labelWidthUnit,
    showText,
    color,
    trailColor,
    strokeWidth,
  } = props

  const _strokeWidth = useMemo(() => {
    return !isNaN(Number(strokeWidth)) ? strokeWidth + "px" : strokeWidth
  }, [strokeWidth])

  return (
    <TooltipWrapper
      tooltipText={tooltipText}
      disabled={!tooltipText}
      position="tl"
    >
      <Wrapper alignment="fullWidth">
        <LabelWrapper
          label={label}
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          labelCaption={labelCaption}
          labelWidthUnit={labelWidthUnit}
          labelPosition={labelPosition}
          tooltipText={tooltipText}
        >
          <Progress
            type="circle"
            percent={value}
            showText={showText}
            color={color}
            trailColor={trailColor}
            strokeWidth={_strokeWidth}
          />
        </LabelWrapper>
      </Wrapper>
    </TooltipWrapper>
  )
})

WrappedCircleProgress.displayName = "WrappedCircleProgress"

export const CircleProgressWidget = WrappedCircleProgress
