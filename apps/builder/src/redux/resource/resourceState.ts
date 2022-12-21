import { ClickhouseResource } from "@/redux/resource/clickhouseResource"
import { FirebaseResource } from "@/redux/resource/firebaseResource"
import { SMTPResource } from "@/redux/resource/smtpResource"
import { ElasticSearchResource } from "./elasticSearchResource"
import { MongoDbConfig, MongoDbResource } from "./mongodbResource"
import { MysqlLikeResource } from "./mysqlLikeResource"
import { RedisResource } from "./redisResource"
import { RestApiAuth, RestApiResource } from "./restapiResource"
import { S3Resource } from "./s3Resource"

export type ResourceType =
  | "firebase"
  | "supabasedb"
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
  | "clickhouse"

export type ResourceContent =
  | ClickhouseResource
  | FirebaseResource
  | SMTPResource
  | S3Resource
  | ElasticSearchResource
  | MysqlLikeResource
  | RestApiResource<RestApiAuth>
  | RedisResource
  | MongoDbResource<MongoDbConfig>

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

export function generateSSLConfig(
  open: boolean,
  data: { [p: string]: any },
  type?: string,
): DbSSL | ClickhouseSSL {
  switch (type) {
    case "clickhouse":
      return open
        ? ({
            ssl: true,
            selfSigned: data.selfSigned,
            privateKey: data.privateKey,
            clientCert: data.clientCert,
            caCert: data.caCert,
          } as ClickhouseSSL)
        : ({
            ssl: false,
            selfSigned: false,
            privateKey: "",
            clientCert: "",
            caCert: "",
          } as ClickhouseSSL)
    default:
      return open
        ? ({
            ssl: true,
            clientKey: data.clientKey,
            clientCert: data.clientCert,
            serverCert: data.serverCert,
          } as DbSSL)
        : ({
            ssl: false,
            clientKey: "",
            clientCert: "",
            serverCert: "",
          } as DbSSL)
  }
}

export type ResourceListState = Resource<ResourceContent>[]
export const resourceInitialState: ResourceListState = []
