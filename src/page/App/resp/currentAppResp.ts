import { ActionListState } from "@/redux/currentApp/action/actionState"
import { DependenciesState } from "@/redux/currentApp/executionTree/dependencies/dependenciesState"
import { ExecutionState } from "@/redux/currentApp/executionTree/execution/executionState"
import { DragShadowState } from "@/redux/currentApp/editor/dragShadow/dragShadowState"
import { DottedLineSquareState } from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareState"
import { DisplayNameState } from "@/redux/currentApp/displayName/displayNameState"
import { ComponentsState } from "@/redux/currentApp/editor/components/componentsState"

export interface CurrentAppResp {
  versionId: string
  appId: string
  versionName: string
  components: ComponentsState
  actions: ActionListState
  dependenciesState: DependenciesState
  executionState: ExecutionState
  dragShadowState: DragShadowState
  dottedLineSquareState: DottedLineSquareState
  displayNameState: DisplayNameState
}
