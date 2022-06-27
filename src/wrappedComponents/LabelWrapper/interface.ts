import LabelProps from "@/wrappedComponents/Label/interface"
import { ReactNode } from "react"

export interface LabelWrapperProps extends LabelProps {
  children: ReactNode
  tooltipText?: string
}
