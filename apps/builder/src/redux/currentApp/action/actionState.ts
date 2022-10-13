import { MysqlLikeAction } from "./mysqlLikeAction"
import { BodyContent, RestApiAction } from "./restapiAction"
import { TransformerAction } from "./transformerAction"
import { RedisAction } from "@/redux/currentApp/action/redisAction"

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
  | "graphql"
  | "mongodb"
  | "redis"
  | "elastic"
  | "postgresql"
  | "mariadb"
  | "snowflake"
  | "tidb"
  | "datadog"
  | "smtp"
  | "zapier"
  | "s3"
  | "transformer"

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

export const actionItemInitial: Partial<ActionItem<ActionContent>> = {
  transformer: {
    enable: false,
    rawData:
      "// The variable 'data' allows you to reference the request's data in the transformer. \n// example: return data.find(element => element.isError)\nreturn data.error",
  },
  triggerMode: "manually",
}

export type ActionContent =
  | MysqlLikeAction
  | RestApiAction<BodyContent>
  | TransformerAction
  | RedisAction

export const actionInitialState: ActionItem<ActionContent>[] = []

export interface UpdateActionItemPayload {
  displayName: string
  data: Record<string, any>
}
