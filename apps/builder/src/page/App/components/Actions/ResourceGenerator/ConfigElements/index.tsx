import { FC, lazy } from "react"
import { ConfigElementProps } from "./interface"

const AirtableConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/AirtableConfigElement"
    ),
)
const AppWriteConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/AppwriteConfigElement"
    ),
)
const ClickhouseConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/ClickhouseConfigElement"
    ),
)
const CouchDBConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/CouchDBConfigElement"
    ),
)
const DynamoDBConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/DynamoDBConfigElement"
    ),
)
const ElasticSearchConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/ElasticSearchConfigElement"
    ),
)
const FirebaseConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/FirebaseConfigElement"
    ),
)
const GoogleSheetsConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/GoogleSheetsConfigElement"
    ),
)
const GraphQLConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/GraphQLConfigElement"
    ),
)
const HuggingFaceConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/HuggingFaceConfigElement"
    ),
)
const HuggingFaceEndpointConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/HuggingFaceEndpointConfigElement"
    ),
)
const MicrosoftSqlConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/MicrosoftSqlConfigElement"
    ),
)
const MongoDbConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/MongoDbConfigElement"
    ),
)
const MysqlLikeConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/MysqlLikeConfigElement"
    ),
)
const NeonConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/NeonConfigElement"
    ),
)
const OracleDBConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/OracleDBConfigElement"
    ),
)
const RedisConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/RedisConfigElement"
    ),
)
const RestApiConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/RestApiConfigElement"
    ),
)
const S3ConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/S3ConfigElement"
    ),
)
const SMTPConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/SMTPConfigElement"
    ),
)
const SnowflakeConfigElement = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ResourceGenerator/ConfigElements/SnowflakeConfigElement"
    ),
)

export const ConfigElement: FC<ConfigElementProps> = (props) => {
  const { resourceType } = props

  switch (resourceType) {
    case "supabasedb":
    case "tidb":
    case "mariadb":
    case "mysql":
    case "hydra":
    case "postgresql":
      return <MysqlLikeConfigElement {...props} resourceType={resourceType} />
    case "neon":
      return <NeonConfigElement {...props} />
    case "mssql":
      return <MicrosoftSqlConfigElement {...props} />
    case "oracle":
    case "oracle9i":
      return <OracleDBConfigElement {...props} />
    case "restapi":
      return <RestApiConfigElement {...props} />
    case "mongodb":
      return <MongoDbConfigElement {...props} />
    case "upstash":
    case "redis":
      return <RedisConfigElement {...props} resourceType={resourceType} />
    case "elasticsearch":
      return <ElasticSearchConfigElement {...props} />
    case "dynamodb":
      return <DynamoDBConfigElement {...props} />
    case "snowflake":
      return <SnowflakeConfigElement {...props} />
    case "firebase":
      return <FirebaseConfigElement {...props} />
    case "graphql":
      return <GraphQLConfigElement {...props} />
    case "s3":
      return <S3ConfigElement {...props} />
    case "smtp":
      return <SMTPConfigElement {...props} />
    case "googlesheets":
      return <GoogleSheetsConfigElement {...props} />
    case "huggingface":
      return <HuggingFaceConfigElement {...props} />
    case "hfendpoint":
      return <HuggingFaceEndpointConfigElement {...props} />
    case "clickhouse":
      return <ClickhouseConfigElement {...props} />
    case "appwrite":
      return <AppWriteConfigElement {...props} />
    case "couchdb":
      return <CouchDBConfigElement {...props} />
    case "airtable":
      return <AirtableConfigElement {...props} />
    default:
      return null
  }
}
