import { Tooltip } from "@illa-design/tooltip"
import { FC } from "react"
import { TooltipWrapperProps } from "./interface"
import { Text } from "../Text"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const TooltipWrapper: FC<TooltipWrapperProps> = (props) => {
  const { children, tooltipText, disabled, position = "tl" } = props
  return (
    <Tooltip
      content={
        <Text
          value={tooltipText}
          disableMarkdown
          textColor={globalColor(`--${illaPrefix}-white-01`)}
        />
      }
      disabled={disabled}
      position={position}
      showArrow={false}
      autoFitPosition={false}
    >
      {children}
    </Tooltip>
  )
}
