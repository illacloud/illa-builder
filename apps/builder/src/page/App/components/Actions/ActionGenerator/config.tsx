import { ActionType } from "@/redux/currentApp/action/actionState"
import i18n from "@/i18n/config"

export interface ActionDataItem {
  actionType: ActionType
  isDraft: boolean
}

export const Databases: ActionDataItem[] = [
  {
    actionType: "mysql",
    isDraft: false,
  },
  {
    actionType: "postgresql",
    isDraft: true,
  },
  {
    actionType: "redis",
    isDraft: true,
  },
  {
    actionType: "mongodb",
    isDraft: true,
  },
]

export const Apis: ActionDataItem[] = [
  {
    actionType: "restapi",
    isDraft: false,
  },
]

export const JsTransformer: ActionDataItem[] = [
  {
    actionType: "transformer",
    isDraft: false,
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
