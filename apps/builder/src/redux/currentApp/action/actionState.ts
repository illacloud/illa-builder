import {
  AppwriteAction,
  AppwriteActionTypes,
} from "@/redux/currentApp/action/appwriteAction"
import {
  CouchDBAction,
  CouchDBOptionsType,
} from "@/redux/currentApp/action/couchDBAction"
import {
  DynamoDBAction,
  StructParams,
} from "@/redux/currentApp/action/dynamoDBAction"
import {
  FirebaseAction,
  FirebaseContentType,
} from "@/redux/currentApp/action/firebaseAction"
import {
  GoogleSheetsAction,
  GoogleSheetsActionOpts,
} from "@/redux/currentApp/action/googleSheetsAction"
import { GraphQLAction } from "@/redux/currentApp/action/graphqlAction"
import {
  HuggingFaceAction,
  HuggingFaceBodyContent,
} from "@/redux/currentApp/action/huggingFaceAction"
import {
  MicrosoftSqlAction,
  MicrosoftSqlActionType,
} from "@/redux/currentApp/action/microsoftSqlAction"
import {
  OracleDBAction,
  OracleDBActionType,
} from "@/redux/currentApp/action/oracleDBAction"
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
  headers?: Record<string, any>
  status?: number
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
  | "couchdb"
  | "mysql"
  | "mssql"
  | "oracle"
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
  | "googlesheet"
  | "s3"
  | "transformer"
  | "appwrite"

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

export interface UpdateActionDisplayNamePayload {
  oldDisplayName: string
  newDisplayName: string
  actionID: string
}

export interface UpdateActionSlicePropsPayload {
  displayName: string
  actionID: string
  propsSlice: {
    [key: string]: unknown
  }
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
  | OracleDBAction<OracleDBActionType>
  | RestApiAction<BodyContent>
  | TransformerAction
  | AppwriteAction<AppwriteActionTypes>
  | RedisAction
  | GraphQLAction
  | MongoDbAction<MongoDbActionTypeContent>
  | CouchDBAction<CouchDBOptionsType>
  | GoogleSheetsAction<GoogleSheetsActionOpts>

export const actionInitialState: ActionItem<ActionContent>[] = []
