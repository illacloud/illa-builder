import { forwardRef, useMemo } from "react"
import { Progress } from "@illa-design/progress"
import { Wrapper } from "@/widgetLibrary/PublicSector/Wrapper"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import LabelWrapper from "@/widgetLibrary/PublicSector/LabelWrapper"
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
      showText,
      styles,
    } = props

    const _strokeWidth = useMemo(() => {
      return !isNaN(Number(styles?.strokeWidth))
        ? styles?.strokeWidth + "px"
        : styles?.strokeWidth
    }, [styles?.strokeWidth])

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
              color={styles?.color}
              trailColor={styles?.trailColor}
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
