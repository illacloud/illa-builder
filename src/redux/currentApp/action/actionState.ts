export interface ActionItemConfig {
  [index: string]: any

  triggerMode?: "manual" | "change"
  transformer?: string
  enableTransformer?: boolean
  events?: []
}

export interface ActionItem {
  actionId: string
  displayName: string
  actionType: string
  resourceId?: string
  actionTemplate: ActionItemConfig
  error?: boolean
  data?: any
  rawData?: any
}

export type ActionListState = ActionItem[]

export const actionInitialState: ActionListState = []
