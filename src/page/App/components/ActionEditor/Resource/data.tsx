import { ReactElement } from "react"
import {
  PostgresIcon,
  MySqlIcon,
  RedisIcon,
  MongoDbIcon,
  RestApiIcon,
  JSTransformerIcon,
} from "@illa-design/icon"
import { ACTION_TYPE } from "@/page/App/components/ActionEditor/constant"

export type ActionTypeCategory = "databases" | "apis" | "jsTransformer"

type ValueOf<T> = T[keyof T]
export type ActionType = ValueOf<typeof ACTION_TYPE>

type ActionTypeNameKey =
  | "my_sql"
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
    nameKey: "my_sql",
    icon: <MySqlIcon />,
    actionType: ACTION_TYPE.MYSQL
  },
  {
    nameKey: "postgres",
    icon: <PostgresIcon />,
    isDraft: true,
    actionType: ACTION_TYPE.POSTGRES
  },
  {
    nameKey: "redis",
    icon: <RedisIcon />,
    isDraft: true,
    actionType: ACTION_TYPE.REDIS
  },
  {
    nameKey: "mongo_db",
    icon: <MongoDbIcon />,
    isDraft: true,
    actionType: ACTION_TYPE.MONGO_DB
  },
]

export const apis: ResourceDataItem[] = [
  {
    nameKey: "rest_api",
    icon: <RestApiIcon />,
    actionType: ACTION_TYPE.REST_API
  },
]

export const jsTransformer: ResourceDataItem[] = [
  {
    nameKey: "js_transformer",
    icon: <JSTransformerIcon />,
    actionType: ACTION_TYPE.TRANSFORMER
  },
]
