import { BaseSetter } from "@/page/App/components/PanelSetters/interface"

export interface BaseInputSetterProps extends BaseSetter {
  placeholder?: string
}

export enum EditableInputIconType {
  RADIUS = "radius",
  STROKE_WIDTH = "strokeWidth",
  TEXT_SIZE = "textSize",
}

export interface EditableInputSetterProps extends BaseInputSetterProps {
  iconName?: EditableInputIconType
}
