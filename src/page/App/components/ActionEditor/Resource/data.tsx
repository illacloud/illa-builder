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
  type: ActionType
  isDraft?: boolean
}

export const databases: ResourceDataItem[] = [
  {
    nameKey: "mySql",
    icon: <MySqlIcon />,
    type: "mysql",
  },
  {
    nameKey: "postgres",
    icon: <PostgresIcon />,
    isDraft: true,
    type: "postgres",
  },
  {
    nameKey: "redis",
    icon: <RedisIcon />,
    isDraft: true,
    type: "redis",
  },
  {
    nameKey: "mongo_db",
    icon: <MongoDbIcon />,
    isDraft: true,
    type: "mongodb",
  },
]

export const apis: ResourceDataItem[] = [
  {
    nameKey: "rest_api",
    icon: <RestApiIcon />,
    type: "restapi",
  },
]

export const jsTransformer: ResourceDataItem[] = [
  {
    nameKey: "js_transformer",
    icon: <JSTransformerIcon />,
    type: "transformer",
  },
]
