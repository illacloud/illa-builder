import { BuilderInfo } from "@/redux/builderInfo/builderInfoState"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { CurrentUser } from "@/redux/currentUser/currentUserState"

export interface CurrentUserInfoInTree {
  userID: string
  nickname: string
  email: string
  avatar: string
  language: string
  createdAt: string
  updateAt: string
}

export interface RawTreeShape {
  [key: string]: any
  builderInfo: BuilderInfo
  currentUserInfo: CurrentUserInfoInTree
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

export interface RawTreeSeedShape {
  widgets: WidgetSeedShape
  actions: ActionSeedShape
  builderInfo: BuilderInfo
  currentUserInfo: CurrentUser
  globalData: Record<string, unknown>
}
