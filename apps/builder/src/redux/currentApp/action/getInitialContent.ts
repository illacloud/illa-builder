import { Agent } from "@illa-public/market-agent"
import {
  ActionContent,
  ActionType,
} from "@/redux/currentApp/action/actionState"
import { AirtableActionConfigInitial } from "@/redux/currentApp/action/airtableAction"
import { AppwriteActionInitial } from "@/redux/currentApp/action/appwriteAction"
import { CouchDBActionInitial } from "@/redux/currentApp/action/couchDBAction"
import { DynamoDBActionInitial } from "@/redux/currentApp/action/dynamoDBAction"
import { ElasticSearchActionInitial } from "@/redux/currentApp/action/elasticSearchAction"
import { FirebaseActionInitial } from "@/redux/currentApp/action/firebaseAction"
import { GoogleSheetsActionInitial } from "@/redux/currentApp/action/googleSheetsAction"
import { GraphQLActionInitial } from "@/redux/currentApp/action/graphqlAction"
import { HuggingFaceActionInitial } from "@/redux/currentApp/action/huggingFaceAction"
import { MicrosoftSqlActionInitial } from "@/redux/currentApp/action/microsoftSqlAction"
import { MongoDbActionInitial } from "@/redux/currentApp/action/mongoDbAction"
import { MysqlLikeActionInitial } from "@/redux/currentApp/action/mysqlLikeAction"
import { OracleDBActionInitial } from "@/redux/currentApp/action/oracleDBAction"
import { RedisActionInitial } from "@/redux/currentApp/action/redisAction"
import { RestApiActionInitial } from "@/redux/currentApp/action/restapiAction"
import { S3ActionInitial } from "@/redux/currentApp/action/s3Action"
import { SMTPActionInitial } from "@/redux/currentApp/action/smtpAction"
import { TransformerActionInitial } from "@/redux/currentApp/action/transformerAction"
import { BaseAiAgentActionContent } from "./aiAgentAction"

export function getInitialContent(actionType: ActionType): ActionContent {
  switch (actionType) {
    case "clickhouse":
    case "supabasedb":
    case "mariadb":
    case "tidb":
    case "mysql":
    case "postgresql":
    case "snowflake":
    case "hydra":
    case "neon":
      return MysqlLikeActionInitial
    case "mssql":
      return MicrosoftSqlActionInitial
    case "oracle":
      return OracleDBActionInitial
    case "restapi":
      return RestApiActionInitial
    case "transformer":
      return TransformerActionInitial
    case "redis":
    case "upstash":
      return RedisActionInitial
    case "mongodb":
      return MongoDbActionInitial
    case "elasticsearch":
      return ElasticSearchActionInitial
    case "dynamodb":
      return DynamoDBActionInitial
    case "s3":
      return S3ActionInitial
    case "smtp":
      return SMTPActionInitial
    case "googlesheets":
      return GoogleSheetsActionInitial
    case "firebase":
      return FirebaseActionInitial
    case "graphql":
      return GraphQLActionInitial
    case "huggingface":
    case "hfendpoint":
      return HuggingFaceActionInitial
    case "appwrite":
      return AppwriteActionInitial
    case "couchdb":
      return CouchDBActionInitial
    case "airtable":
      return AirtableActionConfigInitial
    default:
      return {} as ActionContent
  }
}

export function getInitialAgentContent(agent: Agent): BaseAiAgentActionContent {
  return {
    agentType: agent.agentType,
    model: agent.model,
    variables: agent.variables,
    input: "",
    modelConfig: {
      maxTokens: agent.modelConfig.maxTokens,
      stream: false,
    },
  }
}
