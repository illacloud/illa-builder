import { ResourceType } from "@/redux/resource/resourceState"
import { ReactElement } from "react"
import { ActionType } from "@/redux/currentApp/action/actionState"
import {
  JSTransformerIcon,
  MongoDbIcon,
  MySqlIcon,
  RedisIcon,
  RestApiIcon,
} from "@illa-design/icon"

export function getIconFromResourceType(
  type: ResourceType,
  size: string,
): ReactElement | null {
  switch (type) {
    case "mysql":
      return <MySqlIcon size={size} />
    case "restapi":
      return <RestApiIcon size={size} />
    case "mongodb":
      return <MongoDbIcon size={size} />
    case "redis":
      return <RedisIcon size={size} />
  }
  return null
}

export function getIconFromActionType(
  type: ActionType,
  size: string,
): ReactElement | null {
  switch (type) {
    case "mysql":
      return <MySqlIcon size={size} />
    case "restapi":
      return <RestApiIcon size={size} />
    case "mongodb":
      return <MongoDbIcon size={size} />
    case "redis":
      return <RedisIcon size={size} />
    case "transformer":
      return <JSTransformerIcon size={size} />
  }
  return null
}
