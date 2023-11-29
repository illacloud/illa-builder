import {
  ActionItem,
  RestAPIAction,
  RestAPIBodyContent,
} from "@illa-public/public-types"

export interface BodyEditorProps {
  actionItem: ActionItem<RestAPIAction<RestAPIBodyContent>>
}
