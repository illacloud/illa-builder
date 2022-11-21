import { ActionContent, ActionType } from "./actionState"
import { TransformerActionInitial } from "./transformerAction"
import { MysqlLikeActionInitial } from "./mysqlLikeAction"
import { RestApiActionInitial } from "./restapiAction"
import { RedisActionInitial } from "@/redux/currentApp/action/redisAction"
import { MongoDbActionInitial } from "@/redux/currentApp/action/mongoDbAction"
import { ElasticSearchActionInitial } from "./elasticSearchAction"

export function getInitialContent(actionType: ActionType): ActionContent {
  switch (actionType) {
    case "mariadb":
    case "tidb":
    case "mysql":
    case "postgresql":
      return MysqlLikeActionInitial
    case "restapi":
      return RestApiActionInitial
    case "transformer":
      return TransformerActionInitial
    case "redis":
      return RedisActionInitial
    case "mongodb":
      return MongoDbActionInitial
    case "elasticsearch":
      return ElasticSearchActionInitial
    default:
      return {} as ActionContent
  }
}
