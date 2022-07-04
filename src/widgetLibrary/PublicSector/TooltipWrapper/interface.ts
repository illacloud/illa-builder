import { ReactNode } from "react"
import { TriggerPosition } from "@illa-design/trigger"

export interface TooltipWrapperProps {
  children?: ReactNode
  tooltipText?: string
  position?: TriggerPosition
  disabled?: boolean
}
