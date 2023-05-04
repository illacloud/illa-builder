import { ReactNode } from "react"
import { SetterType } from "@/page/App/components/PanelSetters"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export interface PanelHeaderActionProps {
  widgetDisplayName: string
  componentType: string
}

export interface PanelLabelProps {
  labelName?: string
  labelDesc?: string
  isInList?: boolean
}

export interface EventHandlerPanelConfig extends PanelFieldConfig {
  eventHandlerConfig: EventHandlerConfig
}

export interface PanelFieldConfig extends PanelLabelProps {
  id: string
  setterType: SetterType
  expectedType?: VALIDATION_TYPES | VALIDATION_TYPES[]
  attrName: string | string[]
  childrenSetter?: PanelFieldConfig[]
  useCustomLayout?: boolean
  options?: any
  isSetterSingleRow?: boolean
  defaultValue?: any
  placeholder?: string
  icon?: ReactNode
  shown?: (...params: any[]) => boolean
  bindAttrName?: string | string[]
  openDynamic?: boolean
  allowClear?: boolean
  detailedDescription?: string
  canShowLabel?: boolean
  // DynamicSelectSetter props
  inputPlaceholder?: string
  selectPlaceholder?: string
  isDynamicAttrName?: string
  selectAttrName?: string
  inputAttrName?: string
}

export interface PanelFieldGroupConfig {
  id: string
  groupName: string
  children: PanelFieldConfig[]
}

export type PanelConfig = PanelFieldConfig | PanelFieldGroupConfig

export interface PanelSetterProps extends Omit<PanelFieldConfig, "id"> {
  parentAttrName: string
  displayName: string
}

export interface SelectedPanelProps {
  selectedDisplayNames: string[]
}
