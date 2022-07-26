import { ActionType } from "@/redux/currentApp/action/actionState"
import i18n from "@/i18n/config";

type ActionTypeNameKey =
  | "mysql"
  | "postgres"
  | "redis"
  | "mongodb"
  | "restapi"
  | "js_transformer"

export interface ResourceDataItem {
  nameKey: ActionTypeNameKey
  actionType: ActionType
  isDraft?: boolean
}

export const Databases: ResourceDataItem[] = [
  {
    nameKey: "mysql",
    actionType: "mysql",
  },
  {
    nameKey: "postgres",
    isDraft: true,
    actionType: "postgresql",
  },
  {
    nameKey: "redis",
    isDraft: true,
    actionType: "redis",
  },
  {
    nameKey: "mongodb",
    isDraft: true,
    actionType: "mongodb",
  },
]

export const Apis: ResourceDataItem[] = [
  {
    nameKey: "restapi",
    actionType: "restapi",
  },
]

export const JsTransformer: ResourceDataItem[] = [
  {
    nameKey: "js_transformer",
    actionType: "transformer",
  },
]

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
  {
    title: i18n.t("editor.action.type.js_transformer"),
    item: JsTransformer,
    category: "jsTransformer" as const,
  },
]

export const GeneratorTypeList = [
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