import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { MysqlLikeAction } from "@/redux/currentApp/action/mysqlLikeAction"
import {
  BodyContent,
  RestApiAction,
} from "@/redux/currentApp/action/restapiAction"
import { TransformerAction } from "@/redux/currentApp/action/transformerAction"

export interface RestApiPanelProps {
  action: ActionItem<RestApiAction<BodyContent>>
}

export interface MysqlLikePanelProps {
  action: ActionItem<MysqlLikeAction>
}

export interface TransformerPanelProps {
  action: ActionItem<TransformerAction>
}

export interface ResourceChooseProps {
  action: ActionItem<ActionContent>
}
