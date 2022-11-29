import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  BodyContent,
  RestApiAction,
} from "@/redux/currentApp/action/restapiAction"

export interface BodyEditorProps {
  actionItem: ActionItem<RestApiAction<BodyContent>>
}
