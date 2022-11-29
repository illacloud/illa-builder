import { forwardRef, useMemo, FC, useEffect } from "react"
import { Progress } from "@illa-design/react"
import {
  WrappedCircleProgressProps,
  CircleProgressWidgetProps,
} from "./interface"
import { applyContainerCss } from "@/widgetLibrary/CircleProgressWidget/style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

export const WrappedCircleProgress = forwardRef<
  any,
  WrappedCircleProgressProps
>((props, ref) => {
  const {
    value,
    showText,
    color,
    trailColor,
    strokeWidth,
    h,
    w,
    unitW,
    unitH,
  } = props

  const _strokeWidth = useMemo(() => {
    return !isNaN(Number(strokeWidth)) ? strokeWidth + "px" : strokeWidth
  }, [strokeWidth])

  // delete scale square padding
  const progressWidth = Math.min(w * unitW, h * unitH) - 8 + "px"

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
})

WrappedCircleProgress.displayName = "WrappedCircleProgress"

export const CircleProgressWidget: FC<CircleProgressWidgetProps> = (props) => {
  const {
    value,
    showText,
    color,
    trailColor,
    strokeWidth,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    displayName,
    alignment,
    tooltipText,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      value,
      showText,
      color,
      trailColor,
      strokeWidth,
      setValue: (value: number) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: 0 })
      },
    })

    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    value,
    showText,
    color,
    trailColor,
    strokeWidth,
    displayName,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={applyContainerCss(alignment)}>
        <WrappedCircleProgress {...props} />
      </div>
    </TooltipWrapper>
  )
}

CircleProgressWidget.displayName = "CircleProgressWidget"
