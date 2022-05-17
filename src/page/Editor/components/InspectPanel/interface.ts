import { ReactNode } from "react"
import { SetterType } from "../PanelSetters"

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
  labelName: string
  labelDesc?: string
}

export interface PanelBarProps {
  title: string
  children?: ReactNode
  isOpened?: boolean
}

interface PanelLabel {
  labelName: string
  labelDesc?: string
}

export interface PanelFieldConfig extends PanelLabel {
  id: string
  type: SetterType
  attrName?: string
  childrenSetter?: PanelFieldConfig[]
  // events?:event[] // TODO:
}

export interface PanelFieldGroupConfig {
  id: string
  groupName: string
  children: PanelFieldConfig[]
}

export type PanelConfig = PanelFieldConfig | PanelFieldGroupConfig

export interface PanelSetterProps extends PanelLabel {
  type: SetterType
  attrName?: string
  childrenSetter?: PanelFieldConfig[]
}
