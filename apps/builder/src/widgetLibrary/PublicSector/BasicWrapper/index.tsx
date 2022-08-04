import { FC } from "react"
import { applyBasicWrapperStyle } from "@/widgetLibrary/PublicSector/BasicWrapper/style"
import { BasicWrapperProps } from "@/widgetLibrary/PublicSector/BasicWrapper/interface"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

export const BasicWrapper: FC<BasicWrapperProps> = (props) => {
  const { children, tooltipText, hidden } = props
  return (
    <TooltipWrapper
      position="tl"
      tooltipText={tooltipText}
      disabled={!tooltipText}
    >
      <div css={applyBasicWrapperStyle(hidden)}>{children}</div>
    </TooltipWrapper>
  )
}
BasicWrapper.displayName = "BasicWrapper"
