import { forwardRef, useMemo } from "react"
import { Progress } from "@illa-design/progress"
import { Wrapper } from "@/wrappedComponents/Wrapper"
import { TooltipWrapper } from "@/wrappedComponents/TooltipWrapper"
import LabelWrapper from "@/wrappedComponents/LabelWrapper"
import { WrappedBarProgressProps } from "./interface"

export const WrappedBarProgress = forwardRef<any, WrappedBarProgressProps>(
  (props, ref) => {
    const {
      value,
      tooltipText,
      label,
      labelAlign,
      labelWidth,
      labelPosition,
      labelCaption,
      labelWidthUnit,
      color,
      trailColor,
      showText,
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
              type="line"
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
  },
)

WrappedBarProgress.displayName = "WrappedBarProgress"

export const BarProgressWidget = WrappedBarProgress
