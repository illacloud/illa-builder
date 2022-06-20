import { ExpectedType } from "@/components/CodeEditor/utils"

export interface BaseSetter {
  isSetterSingleRow?: boolean
  value?: any
  defaultValue?: any
  attrName: string
  panelConfig: Record<string, any>
  handleUpdateDsl: (value: Record<string, any>) => void
  expectedType: ExpectedType
  isInList?: boolean
  handleUpdateDynamicStrings?: (action: "add" | "delete", value: string) => void
}
