import i18n from "@/i18n/config"
import { ResourceType } from "@/redux/resource/resourceState"

export interface ResourceDataItem {
  resourceType: ResourceType
  isDraft: boolean
}

export const Databases: ResourceDataItem[] = [
  {
    resourceType: "mysql",
    isDraft: false,
  },
  {
    resourceType: "postgresql",
    isDraft: true,
  },
  {
    resourceType: "redis",
    isDraft: true,
  },
  {
    resourceType: "mongodb",
    isDraft: true,
  },
]

export const Apis: ResourceDataItem[] = [
  {
    resourceType: "restapi",
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
