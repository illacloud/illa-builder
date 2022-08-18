import { DragShadowState } from "@/redux/currentApp/editor/dragShadow/dragShadowState"
import { DottedLineSquareState } from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareState"
import { DisplayNameState } from "@/redux/currentApp/displayName/displayNameState"
import { ComponentsState } from "@/redux/currentApp/editor/components/componentsState"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { DependenciesState } from "@/redux/currentApp/executionTree/executionState"

export interface CurrentAppResp {
  appInfo: DashboardApp
  components: ComponentsState
  actions: ActionItem<ActionContent>[]
  dependenciesState: DependenciesState
  executionState: Record<string, any>
  dragShadowState: DragShadowState
  dottedLineSquareState: DottedLineSquareState
  displayNameState: DisplayNameState
}
