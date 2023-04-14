import { ReactNode } from "react"
import { SelectOptionObject } from "@illa-design/react"
import { PanelLabelProps } from "@/page/App/components/InspectPanel/interface"
import { BaseSetter } from "@/page/App/components/PanelSetters/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface BaseInputSetterProps extends BaseSetter {
  placeholder?: string
  expectedType?: VALIDATION_TYPES
  value?: string
}

export interface EditableInputSetterProps extends BaseInputSetterProps {
  icon?: ReactNode
}

export interface InputWithSelectSetterProps
  extends BaseSetter,
    PanelLabelProps {
  options?: string[] | number[] | SelectOptionObject[]
  expectedType: VALIDATION_TYPES[]
  value: string[]
  placeholder?: string
}
