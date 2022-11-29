import { DragShadowState } from "@/redux/currentApp/editor/dragShadow/dragShadowState"
import { DottedLineSquareState } from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareState"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { DependenciesState } from "@/redux/currentApp/executionTree/executionState"

export interface CurrentAppResp {
  appInfo: DashboardApp
  components: ComponentNode
  actions: ActionItem<ActionContent>[]
  dependenciesState: DependenciesState
  executionState: Record<string, any>
  dragShadowState: DragShadowState
  dottedLineSquareState: DottedLineSquareState
}
