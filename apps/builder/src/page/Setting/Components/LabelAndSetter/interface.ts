import { ReactNode } from "react"
import { LabelProps } from "@/page/Setting/Components/interface"

export interface LabelAndSetterProps extends LabelProps {
  children: ReactNode
  errorMessage: string
}
