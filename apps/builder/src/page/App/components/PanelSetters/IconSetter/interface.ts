import { IconType } from "react-icons"
import { BaseSetter } from "@/page/App/components/PanelSetters/interface"

export type IconShowType = "All" | "Filled" | "Outline"

export type IconDataType = {
  name: string
  getIcon: IconType
}

export interface BaseIconSetterProps extends BaseSetter {
  showData?: IconDataType
}

export interface IconSelectorProps extends BaseSetter {}
