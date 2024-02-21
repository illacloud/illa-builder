import { FC, memo } from "react"
import { Trigger } from "@illa-design/react"
import { ILLAMarkdown } from "@/components/ILLAMarkdown"
import { TooltipWrapperProps } from "./interface"

export const TooltipWrapper: FC<TooltipWrapperProps> = memo(
  (props: TooltipWrapperProps) => {
    const { children, tooltipText, tooltipDisabled } = props

    return (
      <Trigger
        content={<ILLAMarkdown textString={tooltipText} />}
        colorScheme="grayBlue"
        disabled={tooltipDisabled}
        position="top"
        autoFitPosition={false}
        trigger="hover"
      >
        {children}
      </Trigger>
    )
  },
)

TooltipWrapper.displayName = "TooltipWrapper"
