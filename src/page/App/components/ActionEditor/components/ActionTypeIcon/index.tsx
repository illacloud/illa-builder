import { FC } from "react"
import {
  MySqlIcon,
  RedisIcon,
  PostgresIcon,
  MongoDbIcon,
  RestApiIcon,
  JSTransformerIcon,
} from "@illa-design/icon"
import { ACTION_TYPE } from "@/page/App/components/ActionEditor/constant"
import { ActionTypeIconProps } from "./interface"

export const ActionTypeIcon: FC<ActionTypeIconProps> = (props) => {
  const { actionType, className } = props

  switch (actionType) {
    case ACTION_TYPE.MYSQL:
      return <MySqlIcon className={className} />
    case ACTION_TYPE.POSTGRES:
      return <PostgresIcon className={className} />
    case ACTION_TYPE.REDIS:
      return <RedisIcon className={className} />
    case ACTION_TYPE.MONGO_DB:
      return <MongoDbIcon className={className} />
    case ACTION_TYPE.REST_API:
      return <RestApiIcon className={className} />
    case ACTION_TYPE.TRANSFORMER:
      return <JSTransformerIcon className={className} />
    default:
      return null
  }
}

ActionTypeIcon.displayName = "ActionTypeIcon"
