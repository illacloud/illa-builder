import {
  FirebaseAction,
  FirebaseContentType,
} from "@/redux/currentApp/action/firebaseAction"
import { GraphQLAction } from "@/redux/currentApp/action/graphqlAction"
import {
  HuggingFaceAction,
  HuggingFaceBodyContent,
} from "@/redux/currentApp/action/huggingFaceAction"
import { ElasticSearchAction } from "./elasticSearchAction"
import { MongoDbAction, MongoDbActionTypeContent } from "./mongoDbAction"
import { MysqlLikeAction } from "./mysqlLikeAction"
import { RedisAction } from "./redisAction"
import { BodyContent, RestApiAction } from "./restapiAction"
import { S3Action, S3ActionTypeContent } from "./s3Action"
import { SMPTAction } from "./smtpAction"
import { TransformerAction } from "./transformerAction"

export interface Transformer {
  rawData: string
  enable: boolean
}

export interface ActionRunResult {
  data: {
    Rows: Record<string, any>[]
    Extra?: Record<string, any> | null
  }
}

export const TransformerInitial: Transformer = {
  rawData: "",
  enable: false,
}

export const TransformerInitialTrue: Transformer = {
  rawData:
    "// type your code here\n" +
    "// example: return formatDataAsArray(data).filter(row => row.quantity > 20)\n" +
    "return data",
  enable: true,
}

// TODO @aruseito not use any
export interface Events {
  successEvent?: any[]
  failedEvent?: any[]
}

export type ActionType =
  | "huggingface"
  | "firebase"
  | "supabasedb"
  | "clickhouse"
  | "mysql"
  | "restapi"
  | "graphql"
  | "mongodb"
  | "redis"
  | "elasticsearch"
  | "postgresql"
  | "mariadb"
  | "tidb"
  | "smtp"
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
  transformer: TransformerInitial,
  triggerMode: "manually",
}

export type ActionContent =
  | HuggingFaceAction<HuggingFaceBodyContent>
  | FirebaseAction<FirebaseContentType>
  | SMPTAction
  | S3Action<S3ActionTypeContent>
  | ElasticSearchAction
  | MysqlLikeAction
  | RestApiAction<BodyContent>
  | TransformerAction
  | RedisAction
  | GraphQLAction
  | MongoDbAction<MongoDbActionTypeContent>

export const actionInitialState: ActionItem<ActionContent>[] = []
