type ActionType = "action" | "transformer"
type ActionStatus = "warning" | string
interface ActionConnectNetwork {
  totalTime: number
  prepareTime: number
  frontendTime: number
  backendTime: number
  responseSize: number
}

export interface ActionItem {
  id: string
  name: string
  resourceId?: string
  type: ActionType
  status?: ActionStatus
  network?: ActionConnectNetwork
  // TODO: should restrict by resource
  config?: any
}

export type ActionListState = ActionItem[]

export const actionListInitialState: ActionListState = []
