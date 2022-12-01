import i18n from "@/i18n/config"
import { ActionType } from "@/redux/currentApp/action/actionState"

export interface ActionDataItem {
  actionType: ActionType
  isDraft: boolean
}

export const Databases: ActionDataItem[] = [
  {
    actionType: "postgresql",
    isDraft: false,
  },
  {
    actionType: "mysql",
    isDraft: false,
  },
  {
    actionType: "mariadb",
    isDraft: false,
  },
  {
    actionType: "tidb",
    isDraft: false,
  },
  {
    actionType: "redis",
    isDraft: false,
  },
  {
    actionType: "mongodb",
    isDraft: false,
  },
  {
    actionType: "elasticsearch",
    isDraft: false,
  },
]

export const Apis: ActionDataItem[] = [
  {
    actionType: "restapi",
    isDraft: false,
  },
  {
    actionType: "s3",
    isDraft: false,
  },
  {
    actionType: "smtp",
    isDraft: false,
  },
  {
    actionType: "graphql",
    isDraft: true,
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
