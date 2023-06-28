import { FC, useEffect, useMemo } from "react"
import useMeasure from "react-use-measure"
import { Progress } from "@illa-design/react"
import { applyContainerCss } from "@/widgetLibrary/CircleProgressWidget/style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import {
  CircleProgressWidgetProps,
  WrappedCircleProgressProps,
} from "./interface"

export const WrappedCircleProgress: FC<WrappedCircleProgressProps> = (
  props,
) => {
  const {
    value,
    showText,
    color,
    trailColor,
    strokeWidth,
    finalWidth,
    finalHeight,
  } = props

  const _strokeWidth = useMemo(() => {
    return !isNaN(Number(strokeWidth)) ? strokeWidth + "px" : strokeWidth
  }, [strokeWidth])

  // delete scale square padding
  const progressWidth = Math.min(finalWidth, finalHeight) - 8 + "px"

  return (
    <Progress
      type="circle"
      percent={value}
      showText={!showText}
      w={progressWidth}
      color={color}
      trailColor={trailColor}
      strokeWidth={_strokeWidth}
    />
  )
}

WrappedCircleProgress.displayName = "WrappedCircleProgress"

export const CircleProgressWidget: FC<CircleProgressWidgetProps> = (props) => {
  const {
    handleUpdateDsl,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    alignment,
    tooltipText,
  } = props

  useEffect(() => {
    updateComponentRuntimeProps({
      setValue: (value: number) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: 0 })
      },
    })

    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    deleteComponentRuntimeProps,
    handleUpdateDsl,
    updateComponentRuntimeProps,
  ])

  const [wrapperRef, bounds] = useMeasure()

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={applyContainerCss(alignment)} ref={wrapperRef}>
        <WrappedCircleProgress
          {...props}
          finalHeight={bounds.height}
          finalWidth={bounds.width}
        />
      </div>
    </TooltipWrapper>
  )
}

CircleProgressWidget.displayName = "CircleProgressWidget"
export default CircleProgressWidget
