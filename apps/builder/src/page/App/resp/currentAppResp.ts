import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { DashboardApp } from "@/redux/currentApp/appInfo/appInfoState"
import { ComponentNode } from "@/redux/currentApp/components/componentsState"
import { DependenciesState } from "@/redux/currentApp/executionTree/executionState"

export interface CurrentAppResp {
  appInfo: DashboardApp
  components: ComponentNode
  actions: ActionItem<ActionContent>[]
  dependenciesState: DependenciesState
  executionState: Record<string, any>
}
