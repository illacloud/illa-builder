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
    resourceType: "supabase",
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
    resourceType: "smtp",
    isDraft: false,
  },
  {
    resourceType: "graphql",
    isDraft: true,
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
