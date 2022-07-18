import { SetterType } from "@/page/App/components/PanelSetters"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface PanelHeaderActionProps {
  widgetParentDisplayName: string
  widgetDisplayName: string
  componentType: string
}

export interface PanelLabelProps {
  labelName?: any
  labelNameOption?: Record<string, string>
  labelDesc?: string
  labelDescOption?: Record<string, string>
  transComponents?: Record<string, any>
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
  shown?: (value: any | { [attrName: string]: any }) => boolean
  bindAttrName?: string | string[]
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
