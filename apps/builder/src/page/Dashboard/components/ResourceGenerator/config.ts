import i18n from "@/i18n/config"
import { ResourceType } from "@/redux/resource/resourceState"

export interface ResourceDataItem {
  resourceType: ResourceType
}

export const Databases: ResourceDataItem[] = [
  {
    resourceType: "mysql",
  },
  {
    resourceType: "postgresql",
  },
  {
    resourceType: "redis",
  },
  {
    resourceType: "mongodb",
  },
]

export const Apis: ResourceDataItem[] = [
  {
    resourceType: "restapi",
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
