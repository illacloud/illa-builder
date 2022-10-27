import {
  BodyContent,
  RestApiAction,
} from "@/redux/currentApp/action/restapiAction"
import { ActionItem } from "@/redux/currentApp/action/actionState"

export interface BodyEditorProps {
  actionItem: ActionItem<RestApiAction<BodyContent>>
}
