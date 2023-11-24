import {
  AirtableResource,
  AppWriteResource,
  ClickhouseResource,
  CouchdbResource,
  DynamoDBResource,
  ElasticSearchResource,
  FirebaseResource,
  GoogleSheetResource,
  GraphQLAuth,
  GraphQLResource,
  HuggingFaceEndpointResource,
  HuggingFaceResource,
  MicrosoftSqlResource,
  MongoDbConfig,
  MongoDbResource,
  MysqlLikeResource,
  NeonResource,
  OracleResource,
  RedisResource,
  ResourceType,
  RestApiAuth,
  RestApiResource,
  S3Resource,
  SMTPResource,
  SnowflakeAuthenticationType,
  SnowflakeResource,
} from "@illa-public/public-types"

export type ResourceContent =
  | HuggingFaceResource
  | HuggingFaceEndpointResource
  | ClickhouseResource
  | CouchdbResource
  | FirebaseResource
  | AppWriteResource
  | SMTPResource
  | GoogleSheetResource
  | S3Resource
  | ElasticSearchResource
  | DynamoDBResource
  | MysqlLikeResource
  | NeonResource
  | MicrosoftSqlResource
  | OracleResource
  | GraphQLResource<GraphQLAuth>
  | RestApiResource<RestApiAuth>
  | RedisResource
  | MongoDbResource<MongoDbConfig>
  | SnowflakeResource<SnowflakeAuthenticationType>
  | AirtableResource

export interface Resource<T extends ResourceContent> {
  resourceID: string
  resourceName: string
  resourceType: ResourceType
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
  content: T
}

export interface ResourceInitialConfig<T extends ResourceContent> {
  resourceName: string
  resourceType: ResourceType
  content: T
}

export type ResourceListState = Resource<ResourceContent>[]
export const resourceInitialState: ResourceListState = []
