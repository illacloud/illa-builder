import { ActionContent, ActionType } from "./actionState"
import { TransformerActionInitial } from "./transformerAction"
import { MysqlLikeActionInitial } from "./mysqlLikeAction"
import { RestApiActionInitial } from "./restapiAction"
import { PostgresqlActionInitial } from "@/redux/currentApp/action/postgresqlAction"
import { RedisActionInitial } from "@/redux/currentApp/action/redisAction"

// @ts-ignore
export function getInitialContent(actionType: ActionType): ActionContent {
  switch (actionType) {
    case "mariadb":
    case "tidb":
    case "mysql":
      return MysqlLikeActionInitial
    case "postgresql":
      return PostgresqlActionInitial
    case "redis":
      return RedisActionInitial
    case "restapi":
      return RestApiActionInitial
    case "transformer":
      return TransformerActionInitial
    default:
      return {} as ActionContent
  }
}
