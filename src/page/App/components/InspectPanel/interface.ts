import { ReactNode } from "react"
import { SetterType } from "@/page/App/components/PanelSetters"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface HeaderProps {
  // meta: any // TODO: wait meta interface
}

export interface PanelHeaderActionProps {
  widgetParentDisplayName: string
  widgetDisplayName: string
  componentType: string
  handleCloseMenu: () => void
}

export interface PanelLabelProps {
  labelName?: any
  labelDesc?: string
  isInList?: boolean
}

export interface PanelFieldConfig extends PanelLabelProps {
  id: string
  setterType: SetterType
  expectedType?: VALIDATION_TYPES
  attrName: string
  childrenSetter?: PanelFieldConfig[]
  useCustomLayout?: boolean
  options?: any
  isSetterSingleRow?: boolean
  defaultValue?: any
  placeholder?: string
  shown?: (value: any) => boolean
  bindAttrName?: string
  // events?:event[] // TODO:
}

export interface PanelFieldGroupConfig {
  id: string
  groupName: string
  children: PanelFieldConfig[]
}

export type PanelConfig = PanelFieldConfig | PanelFieldGroupConfig

export interface PanelSetterProps extends Omit<PanelFieldConfig, "id"> {
  parentAttrName: string
}

export interface SelectedPanelProps {
  selectedDisplayNames: string[]
}
