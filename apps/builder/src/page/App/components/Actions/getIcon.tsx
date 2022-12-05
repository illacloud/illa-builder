import { ReactElement } from "react"
import { DataDogIcon } from "@/page/App/components/Icons/datadog"
import { ElasticIcon } from "@/page/App/components/Icons/elastic"
import { GraphQLIcon } from "@/page/App/components/Icons/graphql"
import { MariaDbIcon } from "@/page/App/components/Icons/mariadb"
import { MongoDbIcon } from "@/page/App/components/Icons/mongodb"
import { MySqlIcon } from "@/page/App/components/Icons/mysql"
import { PostgreSqlIcon } from "@/page/App/components/Icons/postgresql"
import { RedisIcon } from "@/page/App/components/Icons/redis"
import { RestApiIcon } from "@/page/App/components/Icons/restapi"
import { S3Icon } from "@/page/App/components/Icons/s3"
import { SmtpIcon } from "@/page/App/components/Icons/smtp"
import { SnowflakeIcon } from "@/page/App/components/Icons/snowflake"
import { TidbIcon } from "@/page/App/components/Icons/tidb"
import { TransformerIcon } from "@/page/App/components/Icons/transformer"
import { ZapierIcon } from "@/page/App/components/Icons/zapier"
import { ActionType } from "@/redux/currentApp/action/actionState"
import { ResourceType } from "@/redux/resource/resourceState"
import { SupabaseIcon } from "@/page/App/components/Icons/supabase"

export function getIconFromResourceType(
  type: ResourceType,
  size: string,
): ReactElement | null {
  switch (type) {
    case "supabasedb":
      return <SupabaseIcon size={size} />
    case "graphql":
      return <GraphQLIcon size={size} />
    case "elasticsearch":
      return <ElasticIcon size={size} />
    case "smtp":
      return <SmtpIcon size={size} />
    case "mariadb":
      return <MariaDbIcon size={size} />
    case "tidb":
      return <TidbIcon size={size} />
    case "s3":
      return <S3Icon size={size} />
    case "mysql":
      return <MySqlIcon size={size} />
    case "restapi":
      return <RestApiIcon size={size} />
    case "mongodb":
      return <MongoDbIcon size={size} />
    case "redis":
      return <RedisIcon size={size} />
    case "postgresql":
      return <PostgreSqlIcon size={size} />
  }
  return null
}

export function getIconFromActionType(
  type: ActionType,
  size: string,
): ReactElement | null {
  switch (type) {
    case "graphql":
      return <GraphQLIcon size={size} />
    case "elasticsearch":
      return <ElasticIcon size={size} />
    case "supabasedb":
      return <SupabaseIcon size={size} />
    case "smtp":
      return <SmtpIcon size={size} />
    case "transformer":
      return <TransformerIcon size={size} />
    case "mariadb":
      return <MariaDbIcon size={size} />
    case "tidb":
      return <TidbIcon size={size} />
    case "s3":
      return <S3Icon size={size} />
    case "mysql":
      return <MySqlIcon size={size} />
    case "restapi":
      return <RestApiIcon size={size} />
    case "mongodb":
      return <MongoDbIcon size={size} />
    case "redis":
      return <RedisIcon size={size} />
    case "postgresql":
      return <PostgreSqlIcon size={size} />
  }
  return null
}
