import {
  DynamoDBAction,
  StructParams,
} from "@/redux/currentApp/action/dynamoDBAction"
import {
  FirebaseAction,
  FirebaseContentType,
} from "@/redux/currentApp/action/firebaseAction"
import { GraphQLAction } from "@/redux/currentApp/action/graphqlAction"
import {
  HuggingFaceAction,
  HuggingFaceBodyContent,
} from "@/redux/currentApp/action/huggingFaceAction"
import {
  MicrosoftSqlAction,
  MicrosoftSqlActionType,
} from "@/redux/currentApp/action/microsoftSqlAction"
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
  | "hfendpoint"
  | "firebase"
  | "supabasedb"
  | "clickhouse"
  | "mysql"
  | "mssql"
  | "restapi"
  | "graphql"
  | "mongodb"
  | "redis"
  | "elasticsearch"
  | "dynamodb"
  | "snowflake"
  | "postgresql"
  | "mariadb"
  | "tidb"
  | "smtp"
  | "s3"
  | "transformer"

export type ActionTriggerMode = "manually" | "automate"

export interface ActionConfig {
  public: boolean
}

export interface ActionItem<T extends ActionContent> {
  config: ActionConfig
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
  | DynamoDBAction<StructParams>
  | MysqlLikeAction
  | MicrosoftSqlAction<MicrosoftSqlActionType>
  | RestApiAction<BodyContent>
  | TransformerAction
  | RedisAction
  | GraphQLAction
  | MongoDbAction<MongoDbActionTypeContent>

export const actionInitialState: ActionItem<ActionContent>[] = []
