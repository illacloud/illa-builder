import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface BaseSetter {
  isSetterSingleRow?: boolean
  value?: unknown
  attrName: string
  parentAttrName?: string
  panelConfig?: Record<string, any>
  handleUpdateDsl: (attrPath: string, value: any) => void
  handleUpdateMultiAttrDSL?: (updateSlice: Record<string, any>) => void
  handleUpdateOtherMultiAttrDSL?: (
    displayName: string,
    updateSlice: Record<string, unknown>,
  ) => void
  expectedType?: VALIDATION_TYPES | VALIDATION_TYPES[]
  attrNames?: string[]
  isInList?: boolean
  widgetDisplayName: string
  widgetType: string
  widgetOrAction: "ACTION" | "WIDGET"
  defaultValue?: any
  componentNode?: ComponentNode
}
