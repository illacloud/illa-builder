import i18n from "@/i18n/config"
import { ResourceType } from "@/redux/resource/resourceState"

export interface ResourceDataItem {
  resourceType: ResourceType
  isDraft: boolean
}

export const Databases: ResourceDataItem[] = [
  {
    resourceType: "postgresql",
    isDraft: false,
  },
  {
    resourceType: "mysql",
    isDraft: false,
  },
  {
    resourceType: "mssql",
    isDraft: false,
  },
  {
    resourceType: "mariadb",
    isDraft: false,
  },
  {
    resourceType: "tidb",
    isDraft: false,
  },
  {
    resourceType: "redis",
    isDraft: false,
  },
  {
    resourceType: "mongodb",
    isDraft: false,
  },
  {
    resourceType: "elasticsearch",
    isDraft: false,
  },
  {
    resourceType: "dynamodb",
    isDraft: false,
  },
  {
    resourceType: "snowflake",
    isDraft: false,
  },
  {
    resourceType: "supabasedb",
    isDraft: false,
  },
  {
    resourceType: "clickhouse",
    isDraft: false,
  },
]

export const Apis: ResourceDataItem[] = [
  {
    resourceType: "restapi",
    isDraft: false,
  },
  {
    resourceType: "s3",
    isDraft: false,
  },
  {
    resourceType: "firebase",
    isDraft: false,
  },
  {
    resourceType: "graphql",
    isDraft: false,
  },
  {
    resourceType: "smtp",
    isDraft: false,
  },
  {
    resourceType: "huggingface",
    isDraft: false,
  },
  {
    resourceType: "hfendpoint",
    isDraft: false,
  },
]

export const ResourceTypeList = [
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
