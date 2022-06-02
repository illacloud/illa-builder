import { ReactNode } from "react"
import { SetterType } from "@/page/Editor/components/PanelSetters"

export enum ACTION_TYPE {
  VIEW_DOCUMENT = "VIEW_DOCUMENT",
  SWITCH_COMPONENT = "SWITCH_COMPONENT",
  RESET_STATE = "RESET_STATE",
  DELETE = "DELETE",
}

export interface HeaderProps {
  meta: any // TODO: wait meta interface
}

export interface PanelHeaderActionProps {
  componentId: string
  componentType: string
}

export interface PanelLabelProps {
  labelName?: string
  labelDesc?: string
  isInList?: boolean
  useCustomLabel?: boolean
}

export interface PanelBarProps {
  title: string
  children?: ReactNode
  isOpened?: boolean
}

export interface PanelFieldConfig extends PanelLabelProps {
  id: string
  setterType: SetterType
  attrName: string
  childrenSetter?: PanelFieldConfig[]
  options?: any
  isFullWidth?: boolean
  defaultValue?: any
  placeholder?: string
  shown?: (value: any | { [attrName: string]: any }) => boolean
  bindAttrName?: string | string[]
  isInPop?: boolean
  // events?:event[] // TODO:
}

type GroupName =
  | "BASIC"
  | "OPTIONS"
  | "INTERACTION"
  | "LABEL"
  | "ADORNMENTS"
  | "VALIDATION"
  | "LAYOUT"
  | "STYLE"
  | "OTHER"
  | "DATA"

export interface PanelFieldGroupConfig {
  id: string
  groupName: GroupName
  children: PanelFieldConfig[]
}

export type PanelConfig = PanelFieldConfig | PanelFieldGroupConfig

export interface PanelSetterProps extends Omit<PanelFieldConfig, "id"> {}
