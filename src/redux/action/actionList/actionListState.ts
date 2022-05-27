import { RESTAPIPanelConfig } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/Resources/RESTAPI/interface"
type ActionType = "action" | "transformer"
type ActionStatus = "warning" | string
interface ActionConnectNetwork {
  totalTime: number
  prepareTime: number
  frontendTime: number
  backendTime: number
  responseSize: number
}

interface ActionItemConfig {
  general: RESTAPIPanelConfig
  trigger?: "manual" | "change"
  mode?: "gui" | "plain"
  transfomer: Transformer
  eventHandler: EventHandler
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
