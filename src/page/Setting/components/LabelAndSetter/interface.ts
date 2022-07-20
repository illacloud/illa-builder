import { ReactNode } from "react"
import { LabelProps } from "@/page/Setting/components/interface"

export interface LabelAndSetterProps extends LabelProps {
  children: ReactNode
  errorMessage: string
}
