import { Agent } from "@illa-public/market-agent"
import { ReactNode, lazy } from "react"
import { ActionType } from "@/redux/currentApp/action/actionState"
import { ResourceType } from "@/redux/resource/resourceState"
import { agentActionStyle } from "./styles"

const SupabaseIcon = lazy(() => import("@/page/App/components/Icons/supabase"))
const GraphQLIcon = lazy(() => import("@/page/App/components/Icons/graphql"))
const ElasticIcon = lazy(() => import("@/page/App/components/Icons/elastic"))
const DynamoIcon = lazy(() => import("@/page/App/components/Icons/dynamo"))
const SnowflakeIcon = lazy(
  () => import("@/page/App/components/Icons/snowflake"),
)
const SmtpIcon = lazy(() => import("@/page/App/components/Icons/smtp"))
const GoogleSheetIcon = lazy(
  () => import("@/page/App/components/Icons/googlesheets"),
)
const HuggingFaceIcon = lazy(
  () => import("@/page/App/components/Icons/huggingface"),
)
const MariaDbIcon = lazy(() => import("@/page/App/components/Icons/mariadb"))
const TidbIcon = lazy(() => import("@/page/App/components/Icons/tidb"))
const NeonIcon = lazy(() => import("@/page/App/components/Icons/neon"))
const S3Icon = lazy(() => import("@/page/App/components/Icons/s3"))
const MySqlIcon = lazy(() => import("@/page/App/components/Icons/mysql"))
const MicrosoftSqlIcon = lazy(
  () => import("@/page/App/components/Icons/microsoftsql"),
)
const RestApiIcon = lazy(() => import("@/page/App/components/Icons/restapi"))
const MongoDbIcon = lazy(() => import("@/page/App/components/Icons/mongodb"))
const RedisIcon = lazy(() => import("@/page/App/components/Icons/redis"))
const UpstashIcon = lazy(() => import("@/page/App/components/Icons/upstash"))
const HydraIcon = lazy(() => import("@/page/App/components/Icons/dydra"))
const PostgreSqlIcon = lazy(
  () => import("@/page/App/components/Icons/postgresql"),
)
const FirebaseIcon = lazy(() => import("@/page/App/components/Icons/firebase"))
const ClickhouseIcon = lazy(
  () => import("@/page/App/components/Icons/clickhouse"),
)
const CouchDBIcon = lazy(() => import("@/page/App/components/Icons/couchdb"))
const OracleDBIcon = lazy(() => import("@/page/App/components/Icons/oracle"))
const AppwriteIcon = lazy(() => import("@/page/App/components/Icons/appwrite"))
const AirtableIcon = lazy(() => import("@/page/App/components/Icons/airtable"))
const TransformerIcon = lazy(
  () => import("@/page/App/components/Icons/transformer"),
)

export function getAgentIcon(agent: Agent, size: string) {
  return <img src={agent?.icon} css={agentActionStyle(size)} />
}

export function getIconFromResourceType(
  type: ResourceType,
  size: string,
): ReactNode | null {
  switch (type) {
    case "supabasedb":
      return <SupabaseIcon size={size} />
    case "graphql":
      return <GraphQLIcon size={size} />
    case "elasticsearch":
      return <ElasticIcon size={size} />
    case "dynamodb":
      return <DynamoIcon size={size} />
    case "snowflake":
      return <SnowflakeIcon size={size} />
    case "smtp":
      return <SmtpIcon size={size} />
    case "googlesheets":
      return <GoogleSheetIcon size={size} />
    case "hfendpoint":
    case "huggingface":
      return <HuggingFaceIcon size={size} />
    case "mariadb":
      return <MariaDbIcon size={size} />
    case "tidb":
      return <TidbIcon size={size} />
    case "neon":
      return <NeonIcon size={size} />
    case "s3":
      return <S3Icon size={size} />
    case "mysql":
      return <MySqlIcon size={size} />
    case "mssql":
      return <MicrosoftSqlIcon size={size} />
    case "restapi":
      return <RestApiIcon size={size} />
    case "mongodb":
      return <MongoDbIcon size={size} />
    case "redis":
      return <RedisIcon size={size} />
    case "upstash":
      return <UpstashIcon size={size} />
    case "hydra":
      return <HydraIcon size={size} />
    case "postgresql":
      return <PostgreSqlIcon size={size} />
    case "firebase":
      return <FirebaseIcon size={size} />
    case "clickhouse":
      return <ClickhouseIcon size={size} />
    case "couchdb":
      return <CouchDBIcon size={size} />
    case "oracle":
      return <OracleDBIcon size={size} />
    case "appwrite":
      return <AppwriteIcon size={size} />
    case "airtable":
      return <AirtableIcon size={size} />
  }
  return null
}

export function getIconFromActionType(
  type: ActionType,
  size: string,
): ReactNode | null {
  switch (type) {
    case "graphql":
      return <GraphQLIcon size={size} />
    case "elasticsearch":
      return <ElasticIcon size={size} />
    case "dynamodb":
      return <DynamoIcon size={size} />
    case "snowflake":
      return <SnowflakeIcon size={size} />
    case "supabasedb":
      return <SupabaseIcon size={size} />
    case "smtp":
      return <SmtpIcon size={size} />
    case "googlesheets":
      return <GoogleSheetIcon size={size} />
    case "hfendpoint":
    case "huggingface":
      return <HuggingFaceIcon size={size} />
    case "transformer":
      return <TransformerIcon size={size} />
    case "mariadb":
      return <MariaDbIcon size={size} />
    case "tidb":
      return <TidbIcon size={size} />
    case "neon":
      return <NeonIcon size={size} />
    case "s3":
      return <S3Icon size={size} />
    case "mysql":
      return <MySqlIcon size={size} />
    case "mssql":
      return <MicrosoftSqlIcon size={size} />
    case "restapi":
      return <RestApiIcon size={size} />
    case "mongodb":
      return <MongoDbIcon size={size} />
    case "redis":
      return <RedisIcon size={size} />
    case "upstash":
      return <UpstashIcon size={size} />
    case "hydra":
      return <HydraIcon size={size} />
    case "postgresql":
      return <PostgreSqlIcon size={size} />
    case "firebase":
      return <FirebaseIcon size={size} />
    case "clickhouse":
      return <ClickhouseIcon size={size} />
    case "oracle":
      return <OracleDBIcon size={size} />
    case "couchdb":
      return <CouchDBIcon size={size} />
    case "appwrite":
      return <AppwriteIcon size={size} />
    case "airtable":
      return <AirtableIcon size={size} />
  }
  return null
}
