import { forwardRef, useMemo } from "react"
import { Progress } from "@illa-design/progress"
import { WrappedCircleProgressProps } from "./interface"

export const WrappedCircleProgress = forwardRef<
  any,
  WrappedCircleProgressProps
>((props, ref) => {
  const { value, showText, color, trailColor, strokeWidth } = props

  const _strokeWidth = useMemo(() => {
    return !isNaN(Number(strokeWidth)) ? strokeWidth + "px" : strokeWidth
  }, [strokeWidth])

  return (
    <Progress
      type="circle"
      percent={value}
      showText={showText}
      color={color}
      trailColor={trailColor}
      strokeWidth={_strokeWidth}
    />
  )
})

WrappedCircleProgress.displayName = "WrappedCircleProgress"

export const CircleProgressWidget = WrappedCircleProgress
