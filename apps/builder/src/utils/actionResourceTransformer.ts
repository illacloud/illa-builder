import { ActionType } from "@/redux/currentApp/action/actionState"
import { ResourceType } from "@/redux/resource/resourceState"

export function getActionTypeFromResourceType(
  resourceType: ResourceType | null | undefined,
): ActionType | null {
  return resourceType as ActionType
}

export function getActionSubTitleFromActionType(
  actionType: ActionType | null | undefined,
): string {
  if (actionType) {
    switch (actionType) {
      case "huggingface":
        return "Inference API"
      case "hfendpoint":
        return "Inference Endpoint"
    }
  }
  return ""
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
      case "oracle":
        return "Oracle DB"
      case "restapi":
        return "REST API"
      case "graphql":
        return "GraphQL"
      case "mongodb":
        return "MongoDB"
      case "redis":
        return "Redis"
      case "upstash":
        return "Upstash"
      case "elasticsearch":
        return "Elastic Search"
      case "dynamodb":
        return "DynamoDB"
      case "snowflake":
        return "Snowflake"
      case "postgresql":
        return "PostgreSQL"
      case "hydra":
        return "Hydra"
      case "mariadb":
        return "MariaDB"
      case "tidb":
        return "TiDB"
      case "neon":
        return "Neon"
      case "smtp":
        return "SMTP"
      case "googlesheets":
        return "Google Sheets"
      case "huggingface":
        return "Hugging Face"
      case "hfendpoint":
        return "Hugging Face"
      case "firebase":
        return "Firebase"
      case "clickhouse":
        return "ClickHouse"
      case "couchdb":
        return "CouchDB"
      case "appwrite":
        return "Appwrite"
      case "s3":
        return "Amazon S3"
      case "transformer":
        return "Transformer"
      case "airtable":
        return "Airtable"
      default:
        return ""
    }
  } else {
    return ""
  }
}

export function getResourceSubTitleFromResourceType(
  resourceType: ResourceType | null | undefined,
): string {
  if (resourceType) {
    switch (resourceType) {
      case "huggingface":
        return "Inference API"
      case "hfendpoint":
        return "Inference Endpoint"
    }
  }
  return ""
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
      case "oracle":
        return "Oracle DB"
      case "restapi":
        return "REST API"
      case "graphql":
        return "GraphQL"
      case "mongodb":
        return "MongoDB"
      case "redis":
        return "Redis"
      case "upstash":
        return "Upstash"
      case "elasticsearch":
        return "Elastic Search"
      case "dynamodb":
        return "DynamoDB"
      case "snowflake":
        return "Snowflake"
      case "postgresql":
        return "PostgreSQL"
      case "hydra":
        return "Hydra"
      case "mariadb":
        return "MariaDB"
      case "tidb":
        return "TiDB"
      case "neon":
        return "Neon"
      case "smtp":
        return "SMTP"
      case "googlesheets":
        return "Google Sheets"
      case "hfendpoint":
        return "Hugging Face"
      case "huggingface":
        return "Hugging Face"
      case "s3":
        return "Amazon S3"
      case "firebase":
        return "Firebase"
      case "clickhouse":
        return "ClickHouse"
      case "appwrite":
        return "Appwrite"
      case "couchdb":
        return "CouchDB"
      case "airtable":
        return "Airtable"
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
