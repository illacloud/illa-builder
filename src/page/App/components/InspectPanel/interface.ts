import { ReactNode } from "react"
import { SetterType } from "@/page/App/components/PanelSetters"
import { ExpectedType } from "@/components/CodeEditor/utils"

export enum ACTION_TYPE {
  VIEW_DOCUMENT = "VIEW_DOCUMENT",
  SWITCH_COMPONENT = "SWITCH_COMPONENT",
  RESET_STATE = "RESET_STATE",
  DELETE = "DELETE",
}

export interface HeaderProps {
  // meta: any // TODO: wait meta interface
}

export interface PanelHeaderActionProps {
  widgetParentDisplayName: string
  widgetDisplayName: string
  componentType: string
}

export interface PanelLabelProps {
  labelName?: string
  labelDesc?: string
  isInList?: boolean
}
export interface PanelBarProps {
  title: string
  children?: ReactNode
  isOpened?: boolean
  saveToggleState: (value: boolean) => void
}

export interface PanelFieldConfig extends PanelLabelProps {
  id: string
  setterType: SetterType
  expectedType?: ExpectedType
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

export interface PanelSetterProps extends Omit<PanelFieldConfig, "id"> {}

export interface SelectedPanelProps {
  selectedDisplayNames: string[]
}
