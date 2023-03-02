import { PanelLabelProps } from "@/page/App/components/InspectPanel/interface"
import { BaseSetter } from "@/page/App/components/PanelSetters/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface BaseSelectSetterProps extends BaseSetter {
  options?: any
  allowClear?: boolean
  onChange?: (value: any) => void
  placeholder?: string
  value: string
}

export interface BaseDynamicSelectSetterProps extends PanelLabelProps {
  isDynamic: boolean
  onClickFxButton: () => void
  onChangeInput: (value: string) => void
  onChangeSelect: (value: any) => void
  path: string
  options: any
  value: any
  expectedType: VALIDATION_TYPES
  selectPlaceholder?: string
  inputPlaceholder?: string
  isError: boolean
}

export interface HeightModeSetterProps extends BaseSelectSetterProps {
  handleUpdateMultiAttrDSL: (updateSlice: Record<string, any>) => void
}
