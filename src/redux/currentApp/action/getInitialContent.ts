import { ActionContent } from "./actionState"
import { MysqlActionInitial } from "./mysqlAction"
import { RestApiActionInitial } from "./restapiAction"
import { MongodbActionInitial } from "./mongodbAction"
import { PostgresqlActionInitial } from "@/redux/currentApp/action/postgresqlAction"
import { RedisActionInitial } from "@/redux/currentApp/action/redisAction"
import { ResourceType } from "@/redux/resource/resourceState"

export function getInitialContent(resourceType: ResourceType): ActionContent {
  switch (resourceType) {
    case "mongodb":
      return MongodbActionInitial
    case "mysql":
      return MysqlActionInitial
    case "postgresql":
      return PostgresqlActionInitial
    case "redis":
      return RedisActionInitial
    case "restapi":
      return RestApiActionInitial
  }
}
