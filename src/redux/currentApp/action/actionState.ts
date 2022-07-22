export interface Transformer {
  rawData: string
  enable: boolean
}

export type ActionType =
  | "mysql"
  | "restapi"
  | "mongodb"
  | "redis"
  | "postgresql"
  | "transformer"

export interface ActionItem {
  actionId: string
  displayName: string
  actionType: ActionType
  transformer: Transformer
  triggerMode: "manually" | "automate"
  resourceId?: string
}

export const actionInitialState: ActionItem[] = []
