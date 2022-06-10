import { ReactElement } from "react"
import {
  PostgresIcon,
  MySqlIcon,
  RedisIcon,
  MongoDbIcon,
  RestApiIcon,
  JSTransformerIcon,
} from "@illa-design/icon"

export type ActionTypeCategory = "databases" | "apis" | "jsTransformer"

export type ActionType =
  | "mysql"
  | "postgres"
  | "redis"
  | "mongodb"
  | "restapi"
  | "transformer"

type ActionTypeNameKey =
  | "mySql"
  | "postgres"
  | "redis"
  | "mongo_db"
  | "rest_api"
  | "js_transformer"

export interface ResourceDataItem {
  nameKey: ActionTypeNameKey
  icon: ReactElement
  actionType: ActionType
  isDraft?: boolean
}

export const databases: ResourceDataItem[] = [
  {
    nameKey: "mySql",
    icon: <MySqlIcon />,
    actionType: "mysql",
  },
  {
    nameKey: "postgres",
    icon: <PostgresIcon />,
    isDraft: true,
    actionType: "postgres",
  },
  {
    nameKey: "redis",
    icon: <RedisIcon />,
    isDraft: true,
    actionType: "redis",
  },
  {
    nameKey: "mongo_db",
    icon: <MongoDbIcon />,
    isDraft: true,
    actionType: "mongodb",
  },
]

export const apis: ResourceDataItem[] = [
  {
    nameKey: "rest_api",
    icon: <RestApiIcon />,
    actionType: "restapi",
  },
]

export const jsTransformer: ResourceDataItem[] = [
  {
    nameKey: "js_transformer",
    icon: <JSTransformerIcon />,
    actionType: "transformer",
  },
]
