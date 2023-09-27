import i18n from "@/i18n/config"
import { ActionType } from "@/redux/currentApp/action/actionState"

export const Databases: ActionType[] = [
  "postgresql",
  "mysql",
  "mssql",
  "oracle",
  "mariadb",
  "tidb",
  "neon",
  "redis",
  "upstash",
  "mongodb",
  "elasticsearch",
  "dynamodb",
  "snowflake",
  "supabasedb",
  "clickhouse",
  "couchdb",
  "appwrite",
  "hydra",
]

export const Apis: ActionType[] = [
  "restapi",
  "s3",
  "firebase",
  "graphql",
  "smtp",
  "googlesheets",
  "airtable",
  "huggingface",
  "hfendpoint",
]

export const JsTransformer: ActionType[] = ["transformer"]

export const AIAgent: ActionType[] = ["aiagent"]

export const ActionTypeList = [
  {
    title: i18n.t("editor.action.type.database"),
    item: Databases,
    category: "databases" as const,
  },
  {
    title: i18n.t("editor.action.type.api"),
    item: Apis,
    category: "apis" as const,
  },
]
