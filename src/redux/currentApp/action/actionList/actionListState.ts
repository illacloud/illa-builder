import {
  RESTAPIParamValues,
  MySQLParamValues,
} from "@/page/Editor/components/ActionEditor/Resource"
export type ActionType = "resource" | "transformer"
type ActionStatus = "warning" | string
interface ActionConnectNetwork {
  totalTime: number
  prepareTime: number
  frontendTime: number
  backendTime: number
  responseSize: number
}

export interface ActionItemConfig {
  general: RESTAPIParamValues | MySQLParamValues | string
  trigger?: "manual" | "change"
  mode?: "gui" | "plain"
  transformer?: Transformer
  eventHandler?: EventHandler
}

interface Transformer {
  enable: boolean
  value: string
}

interface EventHandler {
  success?: string[]
  failure?: string[]
}

export interface ActionItem {
  id: string
  name: string
  resourceId?: string
  type: ActionType
  status?: ActionStatus
  network?: ActionConnectNetwork
  config?: ActionItemConfig
}

export type ActionListState = ActionItem[]

export const actionListInitialState: ActionListState = []
