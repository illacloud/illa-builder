import { FC, useMemo } from "react"
import { Progress } from "@illa-design/progress"
import { Wrapper } from "@/wrappedComponents/Wrapper"
import { TooltipWrapper } from "@/wrappedComponents/TooltipWrapper"
import { WrappedCircleProgressProps } from "./interface"
import { applyContainerCss } from "./style"

export const WrappedCircleProgress: FC<WrappedCircleProgressProps> = (
  props,
) => {
  const {
    value,
    tooltipText,
    color,
    trailColor,
    showText,
    strokeWidth,
    alignment,
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
        <div css={applyContainerCss(alignment)}>
          <Progress
            type="circle"
            percent={value}
            showText={showText}
            color={color}
            trailColor={trailColor}
            strokeWidth={_strokeWidth}
          />
        </div>
      </Wrapper>
    </TooltipWrapper>
  )
}

WrappedCircleProgress.displayName = "WrappedDate"

export const CircleProgressWidget = WrappedCircleProgress
