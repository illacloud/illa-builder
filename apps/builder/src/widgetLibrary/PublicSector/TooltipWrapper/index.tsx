import { Tooltip } from "@illa-design/tooltip"
import { FC } from "react"
import { TooltipWrapperProps } from "./interface"
import { Text } from "@/widgetLibrary/TextWidget"

export const TooltipWrapper: FC<TooltipWrapperProps> = props => {
  const { children, tooltipText, disabled, position = "tl" } = props
  return (
    <Tooltip
      content={<Text value={tooltipText} colorScheme="white" />}
      colorScheme="grayBlue"
      disabled={disabled}
      position={position}
      showArrow={false}
      autoFitPosition={false}
    >
      {children}
    </Tooltip>
  )
}
