import { forwardRef, useMemo } from "react"
import { Progress } from "@illa-design/progress"
import { WrappedBarProgressProps } from "./interface"

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
        trailColor={trailColor}
        strokeWidth={_strokeWidth}
      />
    )
  },
)

WrappedBarProgress.displayName = "WrappedBarProgress"

export const BarProgressWidget = WrappedBarProgress
