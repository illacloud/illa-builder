import { FC } from "react"
import {
  MySqlIcon,
  RedisIcon,
  PostgresIcon,
  MongoDbIcon,
  RestApiIcon,
} from "@illa-design/icon"
import { ResourceIconProps } from "./interface"

export const ResourceIcon: FC<ResourceIconProps> = (props) => {
  const { resourceType, className } = props

  switch (resourceType) {
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
    default:
      return null
  }
}

ResourceIcon.displayName = "ResourceIcon"
