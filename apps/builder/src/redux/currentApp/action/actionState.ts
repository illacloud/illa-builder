import { MysqlLikeAction } from "./mysqlLikeAction"
import { BodyContent, RestApiAction } from "./restapiAction"
import { TransformerAction } from "./transformerAction"
import { MongoDbAction, MongoDbActionTypeContent } from "./mongoDbAction"
import { RedisAction } from "./redisAction"

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
    rawData: "",
  },
  triggerMode: "manually",
}

export type ActionContent =
  | MysqlLikeAction
  | RestApiAction<BodyContent>
  | TransformerAction
  | RedisAction
  | MongoDbAction<MongoDbActionTypeContent>

export const actionInitialState: ActionItem<ActionContent>[] = []
