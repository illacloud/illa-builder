import { ComponentTreeNode } from "@illa-public/public-types"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { DashboardApp } from "@/redux/currentApp/appInfo/appInfoState"
import { DependenciesState } from "@/redux/currentApp/executionTree/executionState"

export interface CurrentAppResp {
  appInfo: DashboardApp
  components: ComponentTreeNode
  actions: ActionItem<ActionContent>[]
  dependenciesState: DependenciesState
  executionState: Record<string, any>
}
