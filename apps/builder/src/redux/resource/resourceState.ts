import { ClickhouseResource } from "@/redux/resource/clickhouseResource"
import { DynamoDBResource } from "@/redux/resource/dynamoResource"
import { FirebaseResource } from "@/redux/resource/firebaseResource"
import { GraphQLAuth, GraphQLResource } from "@/redux/resource/graphqlResource"
import { HuggingFaceEndpointResource } from "@/redux/resource/huggingFaceEndpoint"
import { HuggingFaceResource } from "@/redux/resource/huggingFaceResource"
import { SMTPResource } from "@/redux/resource/smtpResource"
import {
  SnowflakeAuthenticationType,
  SnowflakeResource,
} from "@/redux/resource/snowflakeResource"
import { ElasticSearchResource } from "./elasticSearchResource"
import { MongoDbConfig, MongoDbResource } from "./mongodbResource"
import { MysqlLikeResource } from "./mysqlLikeResource"
import { RedisResource } from "./redisResource"
import { RestApiAuth, RestApiResource } from "./restapiResource"
import { S3Resource } from "./s3Resource"

export type ResourceType =
  | "huggingface"
  | "hfendpoint"
  | "firebase"
  | "supabasedb"
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
  | "clickhouse"

export type ResourceContent =
  | HuggingFaceResource
  | HuggingFaceEndpointResource
  | ClickhouseResource
  | FirebaseResource
  | SMTPResource
  | S3Resource
  | ElasticSearchResource
  | DynamoDBResource
  | MysqlLikeResource
  | GraphQLResource<GraphQLAuth>
  | RestApiResource<RestApiAuth>
  | RedisResource
  | MongoDbResource<MongoDbConfig>
  | SnowflakeResource<SnowflakeAuthenticationType>

export interface Resource<T extends ResourceContent> {
  resourceId: string
  resourceName: string
  resourceType: ResourceType
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
  content: T
}

export interface ResourcesData {
  schema: Record<string, unknown>
  resourceName: string
}

export interface DbSSL {
  ssl: boolean
  serverCert: string
  clientKey: string
  clientCert: string
}

export interface ClickhouseSSL {
  ssl: boolean
  selfSigned: boolean
  privateKey: string
  clientCert: string
  caCert: string
}

export interface MicrosoftSqlSSL extends Omit<ClickhouseSSL, "selfSigned"> {
  verificationMode: "full" | "skip"
}

const MicrosoftSqlSSLInitial: MicrosoftSqlSSL = {
  ssl: false,
  privateKey: "",
  clientCert: "",
  caCert: "",
  verificationMode: "full",
}

const ClickhouseSSLInitial: ClickhouseSSL = {
  ssl: false,
  selfSigned: false,
  privateKey: "",
  clientCert: "",
  caCert: "",
}

const DbSSLInitial: DbSSL = {
  ssl: false,
  clientKey: "",
  clientCert: "",
  serverCert: "",
}

type AllSSLConfigType = DbSSL | ClickhouseSSL | MicrosoftSqlSSL

const SSLConfigDefaultValue: Record<string, AllSSLConfigType> = {
  mssql: MicrosoftSqlSSLInitial,
  clickhouse: ClickhouseSSLInitial,
}

const getSSLConfig = (
  data: { [p: string]: any },
  type?: ResourceType,
): AllSSLConfigType => {
  switch (type) {
    case "mssql":
      return {
        ssl: true,
        privateKey: data.privateKey,
        clientCert: data.clientCert,
        caCert: data.caCert,
        verificationMode: !!data.caCert ? "full" : "skip",
      } as MicrosoftSqlSSL
    case "clickhouse":
      return {
        ssl: true,
        selfSigned: data.selfSigned,
        privateKey: data.privateKey,
        clientCert: data.clientCert,
        caCert: data.caCert,
      } as ClickhouseSSL
    default:
      return {
        ssl: true,
        clientKey: data.clientKey,
        clientCert: data.clientCert,
        serverCert: data.serverCert,
      } as DbSSL
  }
}

export function generateSSLConfig(
  open: boolean,
  data: { [p: string]: any },
  type?: ResourceType,
): DbSSL | ClickhouseSSL | MicrosoftSqlSSL {
  return open
    ? getSSLConfig(data, type)
    : SSLConfigDefaultValue[type || ""] || DbSSLInitial
}

export type ResourceListState = Resource<ResourceContent>[]
export const resourceInitialState: ResourceListState = []
