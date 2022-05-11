export enum ACTION_TYPE {
  VIEW_DOCUMENT = "VIEW_DOCUMENT",
  SWITCH_COMPONENT = "SWITCH_COMPONENT",
  RESET_STATE = "RESET_STATE",
  DELETE = "DELETE",
}

export interface HeaderProps {
  meta: any // TODO: wait meta interface
}

export interface HeaderActionProps {
  componentId: string
  componentType: string
}

export interface PanelLabelProps {
  labelName: string
  labelDesc?: string
}

interface PanelLabel {
  labelName: string
  labelDesc?: string
}

export interface PanelFieldConfig extends PanelLabel {
  id: string
  setterType: string // TODO: wait to enum
  canJSCustom?: boolean
  value?: any
  validate?: "string" | "number" | "boolean" | (() => boolean) // TODO:
  attrName: string
  placeholder?: string
  options?: any[]
  // events?:event[] // TODO:
}

export interface PanelFieldGroupConfig {
  id: string
  isOpened?: boolean
  groupName: "Basic" | "Styled" | "Event"
  children: PanelFieldConfig[] | PanelFieldGroupConfig[]
}

export type PanelConfig = PanelFieldConfig | PanelFieldGroupConfig

export interface PanelFieldProps extends PanelFieldConfig {}
