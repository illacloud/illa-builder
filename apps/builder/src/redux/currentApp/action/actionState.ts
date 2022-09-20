import { MysqlAction } from "./mysqlAction"
import { PostgresqlAction } from "./postgresqlAction"
import { RedisAction } from "./redisAction"
import { BodyContent, RestApiAction } from "./restapiAction"
import { MongodbAction } from "./mongodbAction"
import { TransformerAction } from "./transformerAction"
import { ResourceType } from "@/redux/resource/resourceState"

export interface Transformer {
  rawData: string
  enable: boolean
}

// TODO @aruseito not use any
export interface Events {
  successEvent?: any[]
  failedEvent?: any[]
}

export type ActionType =
  | "mysql"
  | "restapi"
  | "mongodb"
  | "redis"
  | "postgresql"
  | "transformer"

export type ActionTriggerMode = "manually" | "automate"

export function getResourceTypeFromActionType(
  actionType: ActionType | null | undefined,
): ResourceType | null {
  switch (actionType) {
    case "mysql":
      return "mysql"
    case "restapi":
      return "restapi"
    case "mongodb":
      return "mongodb"
    case "redis":
      return "redis"
    case "postgresql":
      return "postgresql"
    case "transformer":
      return null
    default:
      return null
  }
}

export interface ActionItem<T extends ActionContent> {
  actionId: string
  displayName: string
  actionType: ActionType
  transformer: Transformer
  triggerMode: ActionTriggerMode
  resourceId?: string
  content: T
}

export const actionItemInitial: Partial<ActionItem<ActionContent>> = {
  transformer: {
    enable: false,
    rawData:
      "// The variable 'data' allows you to reference the request's data in the transformer. \n// example: return data.find(element => element.isError)\nreturn data.error",
  },
  triggerMode: "manually",
}

export type ActionContent =
  | MysqlAction
  | RestApiAction<BodyContent>
  | TransformerAction
  | MongodbAction
  | PostgresqlAction
  | RedisAction

export const actionInitialState: ActionItem<ActionContent>[] = []

export interface UpdateActionItemPayload {
  displayName: string
  data: Record<string, any>
}
