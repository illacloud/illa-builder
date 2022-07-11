export interface ActionItemConfig {
  [index: string]: any

  triggerMode?: "manual" | "change"
  transformer?: string
  enableTransformer?: boolean
  events?: []
}

export interface Runtime {
  // unit: ms
  prepareQuery?: number
  executeResource?: number
  transferData?: number
  handleResponse?: number
  transformer?: number
  postProcessing?: number
  // unit: B
  responseSize?: number
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
  runtime?: Runtime
}

export type ActionListState = ActionItem[]

export const actionInitialState: ActionListState = []
