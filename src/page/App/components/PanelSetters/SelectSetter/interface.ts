import { BaseSetter } from "@/page/App/components/PanelSetters/interface"

export interface BaseSelectSetterProps extends BaseSetter {
  options?: any
  defaultValue?: any
}

export interface ColorSelectSetterProps extends BaseSetter {
  options?: { key: string; value: string }[]
  defaultValue?: string
}
