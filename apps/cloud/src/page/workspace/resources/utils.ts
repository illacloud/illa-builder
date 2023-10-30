import {
  AppWriteResource,
  MicrosoftSqlResource,
  MongoDbConfig,
  MongoDbGuiConfigContent,
  MongoDbResource,
  MysqlLikeResource,
  NeonResource,
  OracleResource,
  RedisResource,
  Resource,
  ResourceContent,
  SnowflakeAuthenticationType,
  SnowflakeResource,
} from "@illa-public/public-types"

export const getDBName = (resource: Resource<ResourceContent>) => {
  let dbName: string | undefined = undefined
  switch (resource.resourceType) {
    // default Null
    case "firebase":
    case "smtp":
    case "restapi":
    case "elasticsearch":
    case "dynamodb":
    case "s3":
    case "huggingface":
    case "hfendpoint":
    case "couchdb":
    case "googlesheets":
    case "airtable":
      break
    // mysql like
    case "clickhouse":
    case "supabasedb":
    case "postgresql":
    case "hydra":
    case "mysql":
    case "tidb":
    case "mariadb":
      dbName = (resource as Resource<MysqlLikeResource>).content.databaseName
      break
    case "neon":
      dbName = (resource as Resource<NeonResource>).content.databaseName
      break
    case "redis":
    case "upstash":
      dbName = (
        resource as Resource<RedisResource>
      ).content.databaseIndex.toString()
      break
    case "mssql":
      dbName = (resource as Resource<MicrosoftSqlResource>).content.databaseName
      break
    case "mongodb":
      const mongoRes = resource as Resource<MongoDbResource<MongoDbConfig>>
      if (mongoRes.content.configType == "gui") {
        dbName = (mongoRes.content.configContent as MongoDbGuiConfigContent)
          .databaseName
      }
      break
    case "snowflake":
      dbName = (
        resource.content as SnowflakeResource<SnowflakeAuthenticationType>
      ).database
      break
    case "appwrite":
      dbName = (resource.content as AppWriteResource).databaseID
      break
    case "oracle":
    case "oracle9i":
      dbName = (resource.content as OracleResource).name
      break
  }
  return dbName
}
