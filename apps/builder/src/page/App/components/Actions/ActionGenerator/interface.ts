import { ActionType } from "@/redux/currentApp/action/actionState"

export interface ActionGeneratorProps {
  visible?: boolean
  onClose: () => void
  defaultStep?: ActionCreatorPage
  defaultActionType?: ActionType | null
  canBackToSelect?: boolean
}

export type ActionCreatorPage =
  | "select"
  | "createAction"
  | "createResource"
  | "directCreateAction"
