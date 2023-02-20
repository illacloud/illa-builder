import { ActionType } from "@/redux/currentApp/action/actionState"
import { ResourceType } from "@/redux/resource/resourceState"

export function getActionTypeFromResourceType(
  resourceType: ResourceType | null | undefined,
): ActionType | null {
  return resourceType as ActionType
}

export function getActionNameFromActionType(actionType: ActionType): string {
  if (actionType) {
    switch (actionType) {
      case "supabasedb":
        return "Supabase DB"
      case "mysql":
        return "MySQL"
      case "mssql":
        return "Microsoft SQL"
      case "restapi":
        return "REST API"
      case "graphql":
        return "GraphQL"
      case "mongodb":
        return "MongoDB"
      case "redis":
        return "Redis"
      case "elasticsearch":
        return "Elastic Search"
      case "snowflake":
        return "Snowflake"
      case "postgresql":
        return "PostgreSQL"
      case "mariadb":
        return "MariaDB"
      case "tidb":
        return "TiDB"
      case "smtp":
        return "SMTP"
      case "huggingface":
        return "Hugging Face Inference API"
      case "firebase":
        return "Firebase"
      case "clickhouse":
        return "ClickHouse"
      case "s3":
        return "Amazon S3"
      case "transformer":
        return "Transformer"
      default:
        return ""
    }
  } else {
    return ""
  }
}

export function getResourceNameFromResourceType(
  resourceType: ResourceType | null | undefined,
): string {
  if (resourceType) {
    switch (resourceType) {
      case "supabasedb":
        return "Supabase DB"
      case "mysql":
        return "MySQL"
      case "mssql":
        return "Microsoft SQL"
      case "restapi":
        return "REST API"
      case "graphql":
        return "GraphQL"
      case "mongodb":
        return "MongoDB"
      case "redis":
        return "Redis"
      case "elasticsearch":
        return "Elastic Search"
      case "snowflake":
        return "Snowflake"
      case "postgresql":
        return "PostgreSQL"
      case "mariadb":
        return "MariaDB"
      case "tidb":
        return "TiDB"
      case "smtp":
        return "SMTP"
      case "huggingface":
        return "Hugging face Inference API"
      case "s3":
        return "Amazon S3"
      case "firebase":
        return "Firebase"
      case "clickhouse":
        return "ClickHouse"
      default:
        return ""
    }
  } else {
    return ""
  }
}

export function getResourceTypeFromActionType(
  actionType: ActionType | null | undefined,
): ResourceType | null {
  if (actionType === "transformer") {
    return null
  } else {
    return actionType as ResourceType
  }
}
