import { LayoutInfo } from "@/redux/currentApp/editor/components/componentsPayload"

export interface MultiSelectedScaleSquareProps {
  unitW: number
  containerDisplayName: string
}

export interface SelectedComponentWithShape extends LayoutInfo {
  parentNode: string
}
