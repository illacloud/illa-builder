import { BaseSetter } from "@/page/App/components/PanelSetters/interface"
import { ReactNode } from "react"

export interface BaseInputSetterProps extends BaseSetter {
  placeholder?: string
}

export interface EditableInputSetterProps extends BaseInputSetterProps {
  icon?: ReactNode
}
