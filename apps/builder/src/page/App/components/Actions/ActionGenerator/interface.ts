export interface ActionGeneratorProps {
  visible?: boolean
  onClose: () => void
}

export type ActionCreatorPage =
  | "select"
  | "createAction"
  | "createResource"
  | "directCreateAction"
