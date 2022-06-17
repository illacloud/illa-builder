import { ExpectedType } from "@/components/CodeEditor/utils"

export interface BaseSetter {
  isFullWidth?: boolean
  value?: any
  defaultValue?: any
  attrName: string
  panelConfig: Record<string, any>
  handleUpdateDsl: (value: Record<string, any>) => void
  expectedType: ExpectedType
}
