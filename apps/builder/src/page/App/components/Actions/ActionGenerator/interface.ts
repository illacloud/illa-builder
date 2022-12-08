export interface ActionGeneratorProps {
  visible?: boolean
  onClose: () => void
  onCreateAction: () => void
}

export type ActionCreatorPage =
  | "select"
  | "createAction"
  | "createResource"
  | "directCreateAction"
