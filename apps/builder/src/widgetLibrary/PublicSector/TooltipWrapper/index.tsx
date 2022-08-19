import { Tooltip } from "@illa-design/tooltip"
import { FC, memo } from "react"
import { TooltipWrapperProps } from "./interface"
import { Text } from "@/widgetLibrary/TextWidget"

export const TooltipWrapper: FC<TooltipWrapperProps> = memo(
  (props: TooltipWrapperProps) => {
    const { children, tooltipText, tooltipDisabled } = props

    return (
      <Tooltip
        content={<Text value={tooltipText} colorScheme="white" />}
        colorScheme="grayBlue"
        disabled={tooltipDisabled}
        position="tl"
        showArrow={false}
        autoFitPosition={false}
        trigger="hover"
      >
        {children}
      </Tooltip>
    )
  },
)

TooltipWrapper.displayName = "TooltipWrapper"
