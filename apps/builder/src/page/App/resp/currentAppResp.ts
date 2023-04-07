import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { DottedLineSquareState } from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareState"
import { DependenciesState } from "@/redux/currentApp/executionTree/executionState"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"

export interface CurrentAppResp {
  appInfo: DashboardApp
  components: ComponentNode
  actions: ActionItem<ActionContent>[]
  dependenciesState: DependenciesState
  executionState: Record<string, any>
  dottedLineSquareState: DottedLineSquareState
}
