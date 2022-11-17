import { ResourceType } from "@/redux/resource/resourceState"
import { ReactElement } from "react"
import { ActionType } from "@/redux/currentApp/action/actionState"
import { MySqlIcon } from "@/page/App/components/Icons/mysql"
import { RestApiIcon } from "@/page/App/components/Icons/restapi"
import { MongoDbIcon } from "@/page/App/components/Icons/mongodb"
import { RedisIcon } from "@/page/App/components/Icons/redis"
import { PostgreSqlIcon } from "@/page/App/components/Icons/postgresql"
import { MariaDbIcon } from "@/page/App/components/Icons/mariadb"
import { SnowflakeIcon } from "@/page/App/components/Icons/snowflake"
import { TidbIcon } from "@/page/App/components/Icons/tidb"
import { DataDogIcon } from "@/page/App/components/Icons/datadog"
import { ZapierIcon } from "@/page/App/components/Icons/zapier"
import { S3Icon } from "@/page/App/components/Icons/s3"
import { TransformerIcon } from "@/page/App/components/Icons/transformer"
import { GraphQLIcon } from "@/page/App/components/Icons/graphql"
import { ElasticIcon } from "@/page/App/components/Icons/elastic"
import { SmtpIcon } from "@/page/App/components/Icons/smtp"

export function getIconFromResourceType(
  type: ResourceType,
  size: string,
): ReactElement | null {
  switch (type) {
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
