import { ActionItem } from "@/redux/currentApp/action/actionState"
import { MysqlAction } from "@/redux/currentApp/action/mysqlAction"
import {
  BodyContent,
  RestApiAction,
} from "@/redux/currentApp/action/restapiAction"
import { TransformerAction } from "@/redux/currentApp/action/transformerAction"

export interface RestApiPanelProps {
  action: ActionItem<RestApiAction<BodyContent>>
}

export interface MysqlPanelProps {
  action: ActionItem<MysqlAction>
}

export interface TransformerPanelProps {
  action: ActionItem<TransformerAction>
}
