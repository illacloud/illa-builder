import { Tooltip } from "@illa-design/tooltip"
import { FC } from "react"
import { TooltipWrapperProps } from "./interface"

const TooltipWrapper: FC<TooltipWrapperProps> = (props) => {
  const { children, content, disabled } = props
  return (
    <Tooltip
      content={content}
      disabled={!!disabled && !!content}
      position="tl"
      showArrow={false}
      autoFitPosition={false}
    >
      {children}
    </Tooltip>
  )
}

export default TooltipWrapper
