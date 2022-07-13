import { BaseSetter } from "@/page/App/components/PanelSetters/interface"

export interface ColorPickerSetterProps extends BaseSetter {
  options?: { key: string; value: string }[]
}
