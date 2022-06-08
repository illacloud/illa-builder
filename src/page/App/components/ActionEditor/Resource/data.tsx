import { ReactElement } from "react"
import {
  PostgresIcon,
  MySqlIcon,
  RedisIcon,
  MongoDbIcon,
  RestApiIcon,
  JSTransformerIcon,
} from "@illa-design/icon"

export interface ResourceDataItem {
  nameKey:
  | "mySql"
  | "postgres"
  | "redis"
  | "mongo_db"
  | "rest_api"
  | "js_transformer"
  icon: ReactElement
  type: string
  isDraft?: boolean
}

export const databases: ResourceDataItem[] = [
  {
    nameKey: "mySql",
    icon: <MySqlIcon />,
    type: "MySQL",
  },
  {
    nameKey: "postgres",
    icon: <PostgresIcon />,
    isDraft: true,
    type: "Postgres",
  },
  {
    nameKey: "redis",
    icon: <RedisIcon />,
    isDraft: true,
    type: "Redis",
  },
  {
    nameKey: "mongo_db",
    icon: <MongoDbIcon />,
    isDraft: true,
    type: "MongoDB",
  },
]

export const apis: ResourceDataItem[] = [
  {
    nameKey: "rest_api",
    icon: <RestApiIcon />,
    type: "RESTAPI",
  },
]

export const jsTransformer: ResourceDataItem[] = [
  {
    nameKey: "js_transformer",
    icon: <JSTransformerIcon />,
    type: "JSTransformer",
  },
]
