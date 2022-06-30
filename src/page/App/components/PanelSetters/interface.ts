import { ExpectedType } from "@/components/CodeEditor/utils"

export interface BaseSetter {
  isSetterSingleRow?: boolean
  value?: any
  attrName: string
  panelConfig: Record<string, any>
  handleUpdateDsl: (attrPath: string, value: any) => void
  expectedType: ExpectedType
  isInList?: boolean
  widgetDisplayName: string
}
