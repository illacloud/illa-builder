import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export interface BaseSetter {
  isSetterSingleRow?: boolean
  value?: any
  attrName: string
  parentAttrName?: string
  panelConfig?: Record<string, any>
  handleUpdateDsl: (attrPath: string, value: any) => void
  handleUpdateMultiAttrDSL?: (updateSlice: Record<string, any>) => void
  handleUpdateOtherMultiAttrDSL?: (
    displayName: string,
    updateSlice: Record<string, any>,
  ) => void
  expectedType: VALIDATION_TYPES
  isInList?: boolean
  widgetDisplayName: string
  widgetType: string
  widgetOrAction: "ACTION" | "WIDGET"
  defaultValue?: any
  componentNode?: ComponentNode
}
