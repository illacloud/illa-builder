import { BuilderInfo } from "@/redux/builderInfo/builderInfoState"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { CurrentUser } from "@/redux/currentUser/currentUserState"

export interface RawTreeShape {
  [key: string]: any
  builderInfo: BuilderInfoSeedShape
  currentUserInfo: CurrenUserInfoSeedShape
}

type ActionSeedShape = ActionItem<ActionContent>[]

export interface WidgetShape {
  [key: string]: string
  $type: "WIDGET"
  $widgetType: string
}
interface WidgetSeedShape {
  [key: string]: WidgetShape
}

type BuilderInfoSeedShape = BuilderInfo

type CurrenUserInfoSeedShape = CurrentUser

export interface RawTreeSeedShape {
  widgets: WidgetSeedShape
  actions: ActionSeedShape
  builderInfo: BuilderInfoSeedShape
  currentUserInfo: CurrenUserInfoSeedShape
}
