import { ReactNode } from "react"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
export interface BasicWrapperProps extends TooltipWrapperProps {
  children?: ReactNode
  hidden?: boolean
}
