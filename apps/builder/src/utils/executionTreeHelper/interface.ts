import { ActionContent, CurrentUserInfo } from "@illa-public/public-types"
import { ActionItem } from "@illa-public/public-types"
import { BuilderInfo } from "@/redux/builderInfo/builderInfoState"

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
  [key: string]: any
  $type: "WIDGET"
  $widgetType: string
  $childrenNode: string[]
}
export interface WidgetSeedShape {
  [key: string]: WidgetShape
}

export interface RawTreeSeedShape {
  widgets: WidgetSeedShape
  actions: ActionSeedShape
  builderInfo: BuilderInfo
  currentUserInfo: CurrentUserInfo
  globalData: Record<string, unknown>
}
