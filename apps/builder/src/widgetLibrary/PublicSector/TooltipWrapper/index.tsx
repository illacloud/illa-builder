import { Trigger } from "@illa-design/react"
import { FC, memo } from "react"
import { TooltipWrapperProps } from "./interface"
import { Text } from "@/widgetLibrary/TextWidget"

export const TooltipWrapper: FC<TooltipWrapperProps> = memo(
  (props: TooltipWrapperProps) => {
    const { children, tooltipText, tooltipDisabled } = props

    return (
      <Trigger
        content={<Text value={tooltipText} colorScheme="white" />}
        colorScheme="grayBlue"
        disabled={tooltipDisabled}
        position="top-start"
        showArrow={false}
        autoFitPosition={false}
        trigger="hover"
      >
        {children}
      </Trigger>
    )
  },
)

TooltipWrapper.displayName = "TooltipWrapper"
