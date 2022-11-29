import { ActionContent, ActionType } from "./actionState"
import { TransformerActionInitial } from "./transformerAction"
import { MysqlLikeActionInitial } from "./mysqlLikeAction"
import { RestApiActionInitial } from "./restapiAction"
import { RedisActionInitial } from "@/redux/currentApp/action/redisAction"
import { MongoDbActionInitial } from "@/redux/currentApp/action/mongoDbAction"
import { ElasticSearchActionInitial } from "@/redux/currentApp/action/elasticSearchAction"
import { S3ActionInitial } from "@/redux/currentApp/action/s3Action"
import { SMTPActionInitial } from "@/redux/currentApp/action/smtpAction"

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
    case "s3":
      return S3ActionInitial
    case "smtp":
      return SMTPActionInitial
    default:
      return {} as ActionContent
  }
}
