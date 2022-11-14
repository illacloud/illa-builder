import { MongoDbConfig, MongoDbResource } from "./mongodbResource"
import { RestApiAuth, RestApiResource } from "./restapiResource"
import { RedisResource } from "./redisResource"
import { MysqlLikeResource } from "./mysqlLikeResource"
import { ElasticSearchResource } from "./elasticSearchResource"

export type ResourceType =
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

export type ResourceContent =
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

export function generateSSLConfig(
  open: boolean,
  data: { [p: string]: any },
): DbSSL {
  if (open) {
    return {
      ssl: true,
      clientKey: data.clientKey,
      clientCert: data.clientCert,
      serverCert: data.serverCert,
    } as DbSSL
  } else {
    return {
      ssl: false,
      clientKey: "",
      clientCert: "",
      serverCert: "",
    } as DbSSL
  }
}

export type ResourceListState = Resource<ResourceContent>[]
export const resourceInitialState: ResourceListState = []
