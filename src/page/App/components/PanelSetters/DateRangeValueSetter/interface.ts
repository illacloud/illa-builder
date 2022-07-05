import { BaseSetter } from "@/page/App/components/PanelSetters/interface"

export interface DateRangeValueSetterProps extends BaseSetter {
  placeholder?: string
  isInList?: boolean
  panelConfig: Record<string, any>
}
