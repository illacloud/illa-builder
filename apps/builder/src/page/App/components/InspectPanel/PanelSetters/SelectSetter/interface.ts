import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"

export interface BaseSelectSetterProps extends BaseSetter {
  options?: any
  allowClear?: boolean
  onChange?: (value: any) => void
  placeholder?: string
  value: string
  showSearch?: boolean
  labelSize?: "medium" | "small"
}

export interface BaseDynamicSelectSetterProps extends BaseSetter {
  isDynamic: boolean
  onClickFxButton: () => void
  onChangeInput: (value: string) => void
  onChangeSelect: (value: any) => void
  path: string
  options: any
  value: any
  selectPlaceholder?: string
  inputPlaceholder?: string
  isError: boolean
  detailedDescription?: string
}

export interface HeightModeSetterProps extends BaseSelectSetterProps {
  handleUpdateMultiAttrDSL: (updateSlice: Record<string, any>) => void
}
