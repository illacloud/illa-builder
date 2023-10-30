import { PanelFieldConfig } from "../../interface"
import { BaseSetter } from "../interface"

export interface OptionItemShape {
  id: string
  value?: string
  label?: string
  disabled?: string
}

export interface OptionListSetterProps extends BaseSetter {
  value: OptionItemShape[]
  childrenSetter?: PanelFieldConfig[]
  headerName?: string
  itemName?: string
}
