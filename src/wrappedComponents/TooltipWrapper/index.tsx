import { Tooltip } from "@illa-design/tooltip"
import { FC } from "react"
import { TooltipWrapperProps } from "./interface"

const TooltipWrapper: FC<TooltipWrapperProps> = (props) => {
  const { children, content, disabled, position = "tl" } = props
  return (
    <Tooltip
      content={content}
      disabled={!!disabled && !!content}
      position={position}
      showArrow={false}
      autoFitPosition={false}
    >
      {children}
    </Tooltip>
  )
}

export default TooltipWrapper
