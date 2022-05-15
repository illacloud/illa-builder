import { ReactNode } from "react"

export interface TooltipWrapperProps {
  content?: string
  children: ReactNode
  disabled?: boolean
  position?: "top" | "tl"
}
