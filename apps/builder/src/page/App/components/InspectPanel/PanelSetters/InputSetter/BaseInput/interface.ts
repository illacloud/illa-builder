import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface NewBaseInputSetterProps {
  isSetterSingleRow?: boolean
  placeholder?: string
  attrName: string
  defaultValue?: any
  handleUpdateDsl: (attrPath: string, value: any) => void
  expectedType?: VALIDATION_TYPES
  value?: string
  widgetDisplayName: string
  labelName?: string
  detailedDescription?: string
  labelDesc?: string
  widgetType: string
  wrappedCodeFunc?: (code: string) => string
  labelSize?: "medium" | "small"
  onlyHasSetter?: boolean
}
