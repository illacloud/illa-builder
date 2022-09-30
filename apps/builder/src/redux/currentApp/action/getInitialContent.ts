import { ActionContent, ActionType } from "./actionState"
import { TransformerActionInitial } from "./transformerAction"
import { MysqlLikeActionInitial } from "./mysqlLikeAction"
import { RestApiActionInitial } from "./restapiAction"
import { PostgreSqlActionInitial } from "@/redux/currentApp/action/postgresqlAction"

// @ts-ignore
export function getInitialContent(actionType: ActionType): ActionContent {
  switch (actionType) {
    case "mariadb":
    case "tidb":
    case "mysql":
      return MysqlLikeActionInitial
    case "postgresql":
      return PostgreSqlActionInitial
    case "restapi":
      return RestApiActionInitial
    case "transformer":
      return TransformerActionInitial
    default:
      return {} as ActionContent
  }
}
