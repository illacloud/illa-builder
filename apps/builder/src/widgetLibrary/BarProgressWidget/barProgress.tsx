import { forwardRef, useMemo, FC, useEffect } from "react"
import { Progress } from "@illa-design/progress"
import { WrappedBarProgressProps, BarProgressWidgetProps } from "./interface"
import { autoWidthContainerStyle } from "@/widgetLibrary/PublicSector/containerStyle"

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

export const BarProgressWidget: FC<BarProgressWidgetProps> = props => {
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
  }, [value, showText, strokeWidth, color, trailColor, displayName])

  return <WrappedBarProgress {...props} />
}

BarProgressWidget.displayName = "BarProgressWidget"
