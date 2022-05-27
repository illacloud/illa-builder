import { BaseSetter } from "@/page/Editor/components/PanelSetters/interface"

export interface BaseSelectSetterProps extends BaseSetter {
  options?: any
  defaultValue?: any
}

export interface ColorSelectSetterProps extends BaseSetter {
  options?: { key: string; value: string }[]
  defaultValue?: string
}
