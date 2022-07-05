import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface BaseSetter {
  isSetterSingleRow?: boolean
  value?: any
  attrName: string
  panelConfig?: Record<string, any>
  handleUpdateDsl: (attrPath: string, value: any) => void
  expectedType: VALIDATION_TYPES
  isInList?: boolean
  widgetDisplayName: string
}
