import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface NewBaseInputSetterProps {
  isSetterSingleRow?: boolean
  placeholder?: string
  attrName: string
  handleUpdateDsl: (attrPath: string, value: any) => void
  expectedType?: VALIDATION_TYPES
  value?: string
  widgetDisplayName: string
  labelName?: string
  detailedDescription?: string
  labelDesc?: string
  widgetType: string
  wrappedCodeFunc?: (code: string) => string
  size?: "medium" | "small"
}

export interface BaseInputSetterProps extends BaseSetter {
  placeholder?: string
  expectedType?: VALIDATION_TYPES
  value?: string
  wrappedCodeFunc?: (code: string) => string
}

// export interface InputWithSelectSetterProps
//   extends BaseSetter,
//     PanelLabelProps {
//   options?: string[] | number[] | SelectOptionObject[]
//   expectedType: VALIDATION_TYPES[]
//   value: string[]
//   placeholder?: string
// }
