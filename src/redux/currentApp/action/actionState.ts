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

export interface ActionContent {}

export interface ActionItem<T extends ActionContent> {
  actionId: string
  contentId: string
  displayName: string
  actionType: ActionType
  transformer: Transformer
  triggerMode: "manually" | "automate"
  resourceId?: string
  content: T
}

export interface MysqlAction extends ActionContent {}

export interface RestApiAction extends ActionContent {}

export const actionInitialState: ActionItem<ActionContent>[] = []
