export interface PanelFieldConfig {
  id: string
  labelName: string
  labelDesc?: string
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
