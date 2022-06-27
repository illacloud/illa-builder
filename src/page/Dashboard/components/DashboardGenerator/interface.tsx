import { ActionTypeInfo } from "@/page/App/components/ActionEditor/ActionGenerator/ActionTypeSelector/interface"

export interface ActionInfo extends ActionTypeInfo {
  resourceId?: string
}

export type ActionType = "edit" | "new"

export interface DashboardGeneratorProps {
  visible: boolean
  actionType: ActionType
  resourceId?: string
  onClose: () => void
  onAddAction?: (info: ActionInfo) => void
  onSuccess: (type: ActionType) => void
}

export type DashboardGeneratorSteps =
  | "type"
  | "resource"
  | "resource-create"
  | "edit"
