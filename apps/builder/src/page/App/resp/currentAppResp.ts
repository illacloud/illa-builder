import { AppInfoShape, ComponentTreeNode } from "@illa-public/public-types"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { DependenciesState } from "@/redux/currentApp/executionTree/executionState"

export interface CurrentAppResp {
  appInfo: AppInfoShape
  components: ComponentTreeNode
  actions: ActionItem<ActionContent>[]
  dependenciesState: DependenciesState
  executionState: Record<string, any>
}
