import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { ReactNode } from "react"

export interface LabelWrapperProps extends LabelProps {
  children: ReactNode
  tooltipText?: string
}
