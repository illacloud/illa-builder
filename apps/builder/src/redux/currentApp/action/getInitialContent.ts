import { ElasticSearchActionInitial } from "@/redux/currentApp/action/elasticSearchAction"
import { MongoDbActionInitial } from "@/redux/currentApp/action/mongoDbAction"
import { RedisActionInitial } from "@/redux/currentApp/action/redisAction"
import { S3ActionInitial } from "@/redux/currentApp/action/s3Action"
import { SMTPActionInitial } from "@/redux/currentApp/action/smtpAction"
import { ActionContent, ActionType } from "./actionState"
import { MysqlLikeActionInitial } from "./mysqlLikeAction"
import { RestApiActionInitial } from "./restapiAction"
import { TransformerActionInitial } from "./transformerAction"
import { FirebaseActionInitial } from "@/redux/currentApp/action/firebaseAction"

export function getInitialContent(actionType: ActionType): ActionContent {
  switch (actionType) {
    case "clickhouse":
    case "supabasedb":
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
    case "firebase":
      return FirebaseActionInitial
    default:
      return {} as ActionContent
  }
}
