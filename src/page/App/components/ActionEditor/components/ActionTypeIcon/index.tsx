import { FC } from "react"
import {
  MySqlIcon,
  RedisIcon,
  PostgresIcon,
  MongoDbIcon,
  RestApiIcon,
  JSTransformerIcon,
} from "@illa-design/icon"
import { ActionTypeIconProps } from "./interface"

export const ActionTypeIcon: FC<ActionTypeIconProps> = (props) => {
  const { actionType, className } = props

  switch (actionType) {
    case "mysql":
      return <MySqlIcon className={className} />
    case "postgres":
      return <PostgresIcon className={className} />
    case "redis":
      return <RedisIcon className={className} />
    case "mongodb":
      return <MongoDbIcon className={className} />
    case "restapi":
      return <RestApiIcon className={className} />
    case "transformer":
      return <JSTransformerIcon className={className} />
    default:
      return null
  }
}

ActionTypeIcon.displayName = "ActionTypeIcon"
