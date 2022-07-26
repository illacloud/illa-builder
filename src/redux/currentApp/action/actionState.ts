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

export type ActionContent = object
export type ActionTriggerMode = "manually" | "automate"

export interface ActionItem<T extends ActionContent> {
  actionId: string
  displayName: string
  actionType: ActionType
  transformer: Transformer
  triggerMode: ActionTriggerMode
  resourceId?: string
  content: T
}

export interface MysqlAction extends ActionContent {
  sqlString: string
}

export interface RestApiAction extends ActionContent {}

export interface TransformerAction extends ActionContent {
  transformerString: string
}

export const actionInitialState: ActionItem<ActionContent>[] = []
