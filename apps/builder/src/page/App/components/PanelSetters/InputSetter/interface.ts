import { ReactNode } from "react"
import { SelectOptionObject } from "@illa-design/react"
import { PanelLabelProps } from "@/page/App/components/InspectPanel/interface"
import { BaseSetter } from "@/page/App/components/PanelSetters/interface"

export interface BaseInputSetterProps extends BaseSetter {
  placeholder?: string
}

export interface EditableInputSetterProps extends BaseInputSetterProps {
  icon?: ReactNode
}

type InputWithSelectExtendProp = BaseInputSetterProps & PanelLabelProps

export interface InputWithSelectSetterProps extends InputWithSelectExtendProp {
  options?: string[] | number[] | SelectOptionObject[]
}
