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
  // events?:event[] // ????待定，事件相关的，还没敲定，先不理他
}

export interface PanelFieldGroupConfig {
  id: string // 随机生成
  isOpened?: boolean // 默认为 true
  groupName: "Basic" | "Styled" | "Event" // 看情况拓展成对象，来搞多语言，但凡展示的都这样考虑
  children: PanelFieldConfig[] | PanelFieldGroupConfig[]
}

export type PanelConfig = PanelFieldConfig | PanelFieldGroupConfig
