import { ActionType } from "@/redux/currentApp/action/actionState"
import i18n from "@/i18n/config"

export interface ActionDataItem {
  actionType: ActionType
}

export const Databases: ActionDataItem[] = [
  {
    actionType: "mysql",
  },
  {
    actionType: "postgresql",
  },
  {
    actionType: "redis",
  },
  {
    actionType: "mongodb",
  },
]

export const Apis: ActionDataItem[] = [
  {
    actionType: "restapi",
  },
]

export const JsTransformer: ActionDataItem[] = [
  {
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
