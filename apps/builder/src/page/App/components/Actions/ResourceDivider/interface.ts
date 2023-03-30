export type ResourceDividerType =
  | "Service Account"
  | "General Option"
  | "Advanced Option"

export interface ResourceDividerProps {
  type: ResourceDividerType
}
