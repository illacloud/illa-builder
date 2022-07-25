import { BaseSetter } from "@/page/App/components/PanelSetters/interface"

export interface BaseInputSetterProps extends BaseSetter {
  placeholder?: string
}

export interface EditableInputSetterProps extends BaseInputSetterProps {
  iconName?: "radius" | "strokeWidth" | "textSize"
}
