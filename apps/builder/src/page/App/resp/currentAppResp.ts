import { DependenciesState } from "@/redux/currentApp/executionTree/dependencies/dependenciesState"
import { ExecutionState } from "@/redux/currentApp/executionTree/execution/executionState"
import { DragShadowState } from "@/redux/currentApp/editor/dragShadow/dragShadowState"
import { DottedLineSquareState } from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareState"
import { DisplayNameState } from "@/redux/currentApp/displayName/displayNameState"
import { ComponentsState } from "@/redux/currentApp/editor/components/componentsState"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"

export interface CurrentAppResp {
  appInfo: DashboardApp
  components: ComponentsState
  actions: ActionItem<ActionContent>[]
  dependenciesState: DependenciesState
  executionState: ExecutionState
  dragShadowState: DragShadowState
  dottedLineSquareState: DottedLineSquareState
  displayNameState: DisplayNameState
}
