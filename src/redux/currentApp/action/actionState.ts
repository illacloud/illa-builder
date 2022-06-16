import {
  RESTAPIParamValues,
  MySQLParamValues,
} from "@/page/App/components/ActionEditor/Resource"

type ActionStatus = "warning" | string

interface ActionConnectNetwork {
  totalTime: number
  prepareTime: number
  frontendTime: number
  backendTime: number
  responseSize: number
}

export interface ActionItemConfig {
  [index: string]: any
  transformer?: string
  events?: []
}

export interface ActionItem {
  actionId: string
  displayName: string
  actionType: string
  resourceId?: string
  status?: ActionStatus
  network?: ActionConnectNetwork
  config?: ActionItemConfig
  actionTemplate?: ActionItemConfig
  error?: boolean
  data?: any
}

export type ActionListState = ActionItem[]

export const actionInitialState: ActionListState = []
