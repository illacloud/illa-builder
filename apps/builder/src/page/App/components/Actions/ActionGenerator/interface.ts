import { ActionType } from "@illa-public/public-types"

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
