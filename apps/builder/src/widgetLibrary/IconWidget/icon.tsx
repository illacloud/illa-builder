import { FC, useCallback } from "react"
import { useMeasure } from "react-use"
import { IconWidgetProps } from "@/widgetLibrary/IconWidget/interface"
import { getIconContainerStyle } from "@/widgetLibrary/IconWidget/style"
import { getIcon } from "@/widgetLibrary/IconWidget/utils"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

export const IconWidget: FC<IconWidgetProps> = (props) => {
  const { tooltipText, iconName, colorScheme, triggerEventHandler } = props

  const [containerRef, containerBounds] = useMeasure<HTMLDivElement>()

  const Icon = getIcon(iconName)

  const handleOnClick = useCallback(() => {
    triggerEventHandler("click")
  }, [triggerEventHandler])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div
        ref={containerRef}
        css={getIconContainerStyle(
          containerBounds.width > containerBounds.height,
          colorScheme,
        )}
      >
        <div onClick={handleOnClick}>{Icon ? <Icon /> : null}</div>
      </div>
    </TooltipWrapper>
  )
}

IconWidget.displayName = "IconWidget"
export default IconWidget
