import { IconType } from "react-icons"
import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"

export type IconShowType = "All" | "Filled" | "Outline"

export type IconDataType = {
  name: string
  getIcon: IconType
}

export interface BaseIconSetterProps extends BaseSetter {
  showData?: IconDataType
}

export interface IconSelectorProps extends BaseSetter {
  value: string
  labelSize?: "medium" | "small"
}

export interface IconPickerListProps {
  iconType: IconShowType
  iconOrigin: string
  searchInput: string
  handleCurrentIconClick: (info: IconDataType) => void
}

export interface IconTriggerComponentProps {
  handleCurrentIconClick: (info: IconDataType) => void
  handleCloseModal: (visible: boolean) => void
}
